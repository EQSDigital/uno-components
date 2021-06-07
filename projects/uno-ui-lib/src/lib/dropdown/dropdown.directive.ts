import {
    Directive, Input, Output, EventEmitter, HostBinding, HostListener, ElementRef, ContentChildren, QueryList, Renderer2,
    OnInit, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DropdownItemDirective } from './dropdown-item.directive';
import { toBoolean } from '../../utils/util';

const openEventEmitter = new EventEmitter<any>();

@Directive({
    selector: '[unoDropdown]',
    // host: {
    //     '[class.slds-dropdown-trigger]': 'true',
    //     '[class.slds-dropdown-trigger--click]': 'true',
    // },
})
export class DropdownDirective implements OnInit, OnDestroy {

    @HostBinding('class.slds-dropdown-trigger') hasTrigger = true;
    @HostBinding('class.slds-dropdown-trigger--click') hasTriggerClick = true;

    @Input('open') set isOpen(isOpen: boolean) {
        this._isOpen = toBoolean(isOpen);

        if (this.isOpen) {
            this.clearGlobalClickTimeout();
            this.globalClickTimeout = setTimeout(() => {
                if (this.unoDropdownHandlePageEvents) {
                    this._subscribeToClickEvents();
                }
            });

            this.renderer.addClass(this.element.nativeElement, 'slds-is-open');
        } else {
            this._unsubscribeFromClickEvents();
            this.renderer.removeClass(this.element.nativeElement, 'slds-is-open');
        }

        this.renderer.setAttribute(this.element.nativeElement, 'aria-expanded', `${this.isOpen}`);
    }
    get isOpen() {
        return this._isOpen;
    }

    @Input() unoDropdownHandlePageEvents = true;

    // ============================

    @ContentChildren(DropdownItemDirective, { descendants: true }) items: QueryList<DropdownItemDirective>;
    @Output() openChange = new EventEmitter<boolean>();
    @Output() selectedElem = new EventEmitter<object>();

    triggerFocusEventEmitter = new EventEmitter();

    private _isOpen = false;
    private openEventSubscription: Subscription;
    private globalClickEventUnsubscriber: Function = null;
    private clickEventUnsubscriber: Function = null;
    private globalClickTimeout: number;

    @HostListener('keydown.esc', ['"esc"'])
    @HostListener('keydown.tab', ['"tab"'])
    onKeydownClose(eventName: string) {
        this.toggle(false);

        if (eventName === 'esc') {
            this.triggerFocusEventEmitter.emit(null);
        }
    }
    @HostListener('keydown.arrowdown', ['$event', '"next"'])
    @HostListener('keydown.arrowup', ['$event', '"previous"'])
    onKeydownFocusNext($event: Event, direction: 'next' | 'previous') {
        $event.preventDefault();
        this.focusItem(direction);
    }

    // Check which, if any, of the items was clicked to be the selected one:
    @HostListener('click')
    dropdownItemWasSelected() {
        const itemsArray = this.items.toArray();
        const clickedIdx = itemsArray.findIndex(
            item => item['selectedClosesDropdown'] === true
        );

        if (clickedIdx >= 0) {
            const selectedItem = itemsArray[clickedIdx];
            const isMultiplePickListDropdown = selectedItem.parentPickOption ?
                selectedItem.parentPickOption.unoPick.isMultiple : false;

            // Clean it, for a new click-selection:
            selectedItem['selectedClosesDropdown'] = false;

            // Emit the status change, except on Multiple options choice @ <uno-picklist /> - if it exists wrapping THIS Dropdown:
            if (!isMultiplePickListDropdown) {
                this.openChange.emit(false);
            }

            // Finally emit the clicked/selected HTMLElement, in case properties are needed where Dropdown is installed:
            this.selectedElem.emit(
                {
                    HTMLElement: selectedItem.element.nativeElement,
                    idx: clickedIdx
                }
            );
        }
    }

    constructor(
        public element: ElementRef,
        public renderer: Renderer2
    ) { }

    ngOnInit() {
        this.openEventSubscription = openEventEmitter.subscribe(this.handleDropdownOpenEvent.bind(this));
    }

    ngOnDestroy() {
        this.clearGlobalClickTimeout();

        if (this.openEventSubscription) {
            this.openEventSubscription.unsubscribe();
        }

        this._unsubscribeFromClickEvents();
    }

    toggle(toggle: boolean = !this.isOpen, focus: boolean = false) {
        if (toggle === this.isOpen) {
            return;
        }

        // Emit the status change
        this.openChange.emit(toggle);

        if (toggle) {
            openEventEmitter.emit(this);
            if (focus) {
                this.focusItem('next');
            }
        }
    }

    private handleGlobalClickEvent($event: any) {
        if (!this.unoDropdownHandlePageEvents || $event.$nglStop) {
            return;
        }

        this.toggle(false);
    }

    private _subscribeToClickEvents() {
        this._unsubscribeFromClickEvents();

        // Prevent document listener to close it, since click happened inside
        this.clickEventUnsubscriber = this.renderer.listen(this.element.nativeElement, 'click', ($event: any) => $event.$nglStop = true);

        this.globalClickEventUnsubscriber = this.renderer.listen('document', 'click', this.handleGlobalClickEvent.bind(this));
    }

    private _unsubscribeFromClickEvents() {
        if (this.clickEventUnsubscriber) {
            this.clickEventUnsubscriber();
            this.clickEventUnsubscriber = null;
        }

        if (this.globalClickEventUnsubscriber) {
            this.globalClickEventUnsubscriber();
            this.globalClickEventUnsubscriber = null;
        }
    }

    private clearGlobalClickTimeout() {
        clearTimeout(this.globalClickTimeout);
    }

    private focusItem(direction: 'next' | 'previous') {
        if (!this.items.length) {
            return;
        }

        const items = this.items.toArray();
        const activeElementIndex = items.findIndex(item => item.hasFocus()) + (direction === 'next' ? 1 : -1);

        if (activeElementIndex === items.length || activeElementIndex < 0) {
            return;
        }

        items[activeElementIndex].focus();
    }

    private handleDropdownOpenEvent(dropdown: DropdownDirective) {
        if (dropdown !== this) {
            this.toggle(false);
        }
    }
}
