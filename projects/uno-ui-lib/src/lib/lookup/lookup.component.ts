import {
    Component, Directive, HostBinding, ContentChild, ChangeDetectionStrategy, Input, Output, EventEmitter,
    ElementRef, Renderer2, ChangeDetectorRef, ViewChild, TemplateRef,
    OnInit, OnChanges, AfterViewChecked, OnDestroy
} from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { switchMap, skip, tap } from 'rxjs/operators';

import { uniqueId, isObject, toBoolean } from '../../utils/util';

// ======================
// Directives we'll use INSIDE <uno-lookup /> UNO ui-library component:
// ======================
@Directive({ selector: '[unoLookupItem]' })
export class LookupItemDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}

@Directive({ selector: '[unoLookupLabel]' })
export class LookupLabelDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}

@Directive({
    selector: '[unoLookupHeader]',
    // host: {
    //     '[class.slds-lookup__item--label]': 'true',
    // },
})
export class LookupHeaderDirective {
    @HostBinding('class.slds-lookup__item--label') hasLabel = true;
}

// ======================
// Our <uno-lookup /> component:
// ======================
@Component({
    selector: 'uno-lookup',
    templateUrl: './lookup.component.html',
    styleUrls: ['lookup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class LookupComponent implements OnInit, OnChanges, AfterViewChecked, OnDestroy {

    @ContentChild(LookupItemDirective) itemTemplate: LookupItemDirective;

    // ==================================================
    @Input() lookup: Function;
    @Input() field: string;
    @Input() placeholder: string;
    @Input() noResultsText = 'Sorry! No results found...';
    @Input() searchIcon = true;
    // "debounce" waits '200' until it lets the next data through. Check "getInputBehaviorSubjectByChanges()"...
    @Input() debounce = 200;
    @Input() set isDisabled(disabled: boolean | string) {
        this._disabled = toBoolean(disabled);
    }
    get isDisabled() {
        return this._disabled;
    }

    @Output() inputWasTouched = new EventEmitter<any>();
    @Output() scrollEndReached = new EventEmitter<any>();

    // ==================================================
    @Input() set value(value: string) {
        if (value !== this.inputSubject.getValue()) {
            this.inputValue = value;
            this.inputSubject.next(value);
        }
    }

    @Output() valueChange = new EventEmitter<string>();

    // ==================================================
    pick: any;
    @Input('pick') set setPick(pick: any) {
        this.inputValue = this.resolveLabel(pick);
        this.pick = pick;
    }

    @Output() pickChange = new EventEmitter();

    // ==================================================
    @Input() label: string;

    @ContentChild(LookupLabelDirective) labelTemplate: LookupLabelDirective;
    // ==================================================

    @ViewChild('lookupInput') inputEl: ElementRef;

    inputId = uniqueId('lookup_input');

    _label: string | TemplateRef<any>;

    private _disabled = false;
    private globalClickUnsubscriber: Function = null;
    private _open = false;

    @Input() set open(_open: boolean) {
        if (this.open === _open) { return; }

        if (_open) {
            this.globalClickUnsubscriber = this.renderer.listen(
                'document', 'click', ($event: MouseEvent) => {
                    this.globalClickHandler($event);
                    this.detector.markForCheck();
                }
            );
        } else {
            this.activeIndex = -1;
            this.unsubscribeGlobalClick();
        }
        this._open = _open;
    }
    get open(): boolean {
        return this._open;
    }

    inputValue = '';
    private inputSubject = new BehaviorSubject(undefined);
    suggestions: any[];
    suggestionsSubscription: Subscription;
    noResults = false;
    activeIndex = -1;
    private lastUserInput: string;
    private pendingFocus = false;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private detector: ChangeDetectorRef
    ) { }

    // ======================
    // Component's Life cycle Methods:
    // ======================
    ngOnInit() {
        const valueStream = this.getInputBehaviorSubjectByChanges(true, true);
        const suggestions$ = this.triggerLookupByChangesOn(valueStream, true);

        // Subscribe to it:
        this.suggestionsSubscription = suggestions$.subscribe(
            (suggestions: any[]) => {
                this.suggestions = suggestions;
                this.noResults = Array.isArray(suggestions) && !suggestions.length;
                this.open = !!suggestions;
                this.detector.markForCheck();
            }
        );
    }

    ngOnChanges() {
        this._label = this.labelTemplate ? this.labelTemplate.templateRef : (this.label || '');
    }

    ngAfterViewChecked() {
        if (this.pendingFocus && !this.pick) {
            this.focus();
        }

        this.pendingFocus = false;
    }

    ngOnDestroy() {
        this.unsubscribeGlobalClick();
        this.suggestionsSubscription.unsubscribe();
    }

    // ======================

    // Whether menu is expanded
    get expanded(): boolean {
        return this.open && !this.pick;
    }

    // Handle scroll event, emitted through <ul>'s "unoScrollTracker" Directive:
    handleScroll(scrollObj: any) {
        // The end....?
        if (scrollObj.endReached) {
            this.scrollEndReached.emit(scrollObj);
            // Trigger new [lookup] refreshment, as if Input was changed:
            // this.inputSubject.next(this.inputEl.nativeElement.value);
            // But it didn't! Input is the same; we want new data by scroll down reaching the end and NOT by Input changes...
            // So:
            // Trigger new Service call, with the SAME Input string:
            const suggestions$ = this.triggerLookupByChangesOn(this.inputSubject, false);

            // Remove "this.inputSubject" eventual previous Observers:
            // this.suggestionsSubscription.unsubscribe();
            // We should; but we can't... you''ll loose track, at instalation, of when trigger is by Input change or scrollDown end,
            // but preserving the correct (changed, in particular) Input string.
            // So... remember "observableOfSuggestions"'s observers property Array is growing infinitelly, by each scrollDown reach.

            // Subscribe to this one, so "this.suggestions" results (or not results) get displayed:
            this.suggestionsSubscription = suggestions$.subscribe(
                (suggestions: any[]) => {
                    this.suggestions = suggestions;
                    this.noResults = Array.isArray(suggestions) && !suggestions.length;
                    this.open = !!suggestions;
                    this.detector.markForCheck();
                }
            );
        }
    }

    pickActive(evt: KeyboardEvent) {
        if (this.activeIndex < 0) {
            return;
        }

        this.handlePick(this.suggestions[this.activeIndex]);
    }

    handlePick(item: any) {
        this.pickChange.emit(item);
    }

    moveActive(evt: KeyboardEvent, moves: number) {
        evt.preventDefault();

        if (!this.expanded) {
            return;
        }

        this.activeIndex = Math.max(-1, Math.min(this.activeIndex + moves, this.suggestions.length - 1));

        // Update input value based on active option
        const value = this.activeIndex === -1 ? this.lastUserInput : this.resolveLabel(this.suggestions[this.activeIndex]);
        this.inputValue = value;
    }

    optionId(index: number) {
        return index < 0 ? null : `${this.inputId}_active_${index}`;
    }

    onInputChange(value: string) {
        this.inputSubject.next(value);
    }

    removeUserSelection() {
        this.pickChange.emit(null);
        this.pendingFocus = true;
    }

    close(evt: KeyboardEvent = null) {
        if (evt) {
            evt.preventDefault();
        }

        this.open = false;
    }

    // ======================
    // AUX functions:
    // ======================

    getInputBehaviorSubjectByChanges(isByChanges: boolean, isDelayed: boolean) {
        let behaviorSubjectOfInput = isByChanges ?
            this.inputSubject
                .pipe(
                    skip(1),
                    tap((value: string) => {
                        this.lastUserInput = value;
                        this.activeIndex = -1;
                        this.valueChange.emit(value);
                    })
                )
            :
            // Return "this.inputSubject", even if it's the same value - i.e. onScroll end:
            this.inputSubject;

        if (isDelayed) {
            // Could be overwritten by instalation @Input() !
            if (this.debounce > 0) {
                // behaviorSubjectOfInput = behaviorSubjectOfInput.pipe(debounceTime(this.debounce));
                behaviorSubjectOfInput = behaviorSubjectOfInput.pipe();
            }
        }

        // Give back the so wanted InputBehaviorSubject:
        return behaviorSubjectOfInput;
    }

    triggerLookupByChangesOn(behaviorSubject: BehaviorSubject<any> | Observable<string>, isDistinct: boolean) {
        // const observableOfSuggestions = isDistinct ? behaviorSubject.pipe(distinctUntilChanged()) : behaviorSubject;
        const observableOfSuggestions = isDistinct ? behaviorSubject.pipe() : behaviorSubject;

        // Return an Observable that will trigger this.lookup(value) on any change (or, the same, but forced to trigger)
        return (
            observableOfSuggestions.pipe(
                switchMap(
                    (value: string) => {
                        const suggestions = this.lookup(value);
                        return suggestions instanceof Observable ? suggestions : of(suggestions);
                    }
                ))
            // .publish()
            // .refCount() // Single instance
        );

        return new Observable<any>();
    }

    resolveLabel(item: any) {
        return this.field && isObject(item) ? item[this.field] : item;
    }

    globalClickHandler($event: MouseEvent) {
        const { nativeElement } = this.element;

        if ($event.target === nativeElement || nativeElement.contains($event.target)) {
            return;
        }

        this.open = false;
    }

    focus() {
        this.inputEl.nativeElement.focus();
    }

    private unsubscribeGlobalClick() {
        if (!this.globalClickUnsubscriber) {
            return;
        }

        this.globalClickUnsubscriber();
        this.globalClickUnsubscriber = null;
    }
}
