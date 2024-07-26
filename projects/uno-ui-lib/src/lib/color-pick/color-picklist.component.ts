import { Component, AfterContentInit, OnDestroy, Input, Output, EventEmitter, ContentChild, Renderer2, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { ColorPickItemDirective } from './color-picklist-item.directive';
import { PickDirective } from '../pick/pick.directive';

@Component({
    selector: 'uno-color-picklist[unoPick]',
    templateUrl: './color-picklist.component.html',
    styleUrls: ['./color-picklist.component.scss'],
    // Don't use changeDetection because uno popover don't close.
})
export class ColorPicklistComponent implements OnChanges, AfterContentInit, OnDestroy {

    @Input() data: any[];

    @Input() isDisabled: boolean = false;

    @Input() isForInlineTableCSS = false;

    @Input() open: boolean = false;

    @Input() closeClickOutside: boolean;

    @Input() popOverPosition = 'bottomLeft';

    @Input() nubbinPosition = 'top-right';

    // ==============================================

    @Output() openChange = new EventEmitter();

    @Output() selectedElem = new EventEmitter<{ HTMLElement: HTMLElement, idx: number }>();

    // ==============================================

    @ContentChild(ColorPickItemDirective) itemTemplate: ColorPickItemDirective;

    private subscriptions$ = new Subscription();

    @ViewChild('button') private button: ElementRef;

    @ViewChild('divColors') private colorsPopover: ElementRef;

    constructor(
        private pick: PickDirective,
        private renderer: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.closeClickOutside?.currentValue) {
            this.subscriptions$.add(
                this.renderer.listen('document', 'click', (evt: Event) => {
                    if (this.button && this.colorsPopover &&
                        evt.target !== this.button.nativeElement && evt.target !== this.colorsPopover.nativeElement) {
                        this.open = false;
                    }
                })
            );
        }
    }

    ngAfterContentInit() {
        this.subscriptions$.add(
            this.pick.unoPickChange.subscribe(() => this.openChange.emit(false))
        );
    }

    ngOnDestroy() {
        this.subscriptions$.unsubscribe();
    }

    isOptionActive(item: any) {
        return this.pick.selected.color === item.color;
    }
}
