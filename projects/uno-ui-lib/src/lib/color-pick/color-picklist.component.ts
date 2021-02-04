import {
    Component, ChangeDetectionStrategy, AfterContentInit, OnDestroy,
    Input, Output, EventEmitter, ContentChild, ViewChild, ElementRef
} from '@angular/core';
import { filter } from 'rxjs/operators';

import { ColorPickItemDirective } from './color-picklist-item.directive';
import { PickDirective } from '../pick/pick.directive';
import { toBoolean } from '../../util/util';

@Component({
    selector: 'uno-color-picklist[unoPick]',
    templateUrl: './color-picklist.component.html',
    styleUrls: ['./color-picklist.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPicklistComponent implements AfterContentInit, OnDestroy {

    @Input() set data(data: any[]) {
        this._data = data;
    }
    get data() {
        return this._data;
    }

    @Input() set fluid(fluid: boolean | string) {
        this._fluid = toBoolean(fluid);
    }
    get fluid() {
        return this._fluid;
    }

    @Input() set isDisabled(disabled: boolean | string) {
        this._disabled = toBoolean(disabled);
    }
    get isDisabled() {
        return this._disabled;
    }

    @Input() isForInlineTableCSS = false;

    @Input() set open(value: boolean) {
        this._open = value;
    }
    get open() {
        return this._open;
    }

    @Input() closeClickOutside: boolean;
    @Input() popOverPosition = 'bottomLeft';
    @Input() nubbinPosition = 'top-right';

    // ==============================================

    @Output() openChange = new EventEmitter();
    @Output() selectedElem = new EventEmitter<{ HTMLElement: HTMLElement, idx: number }>();

    // ==============================================

    @ContentChild(ColorPickItemDirective) itemTemplate: ColorPickItemDirective;

    private _data: any[];
    private _open = false;
    private _changeSubscription: any;
    private _disabled = false;
    private _fluid = false;

    constructor(
        public pick: PickDirective
    ) {
    }

    ngAfterContentInit() {

        this._changeSubscription = this.pick.unoPickChange
            .subscribe(
                () => this.openChange.emit(false)
            );

        // By default, allow picklist Dropdown to close, once user clicks outside:
        if (this.closeClickOutside === undefined) {
            this.closeClickOutside = true;
        }
    }

    ngOnDestroy() {
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
            this._changeSubscription = null;
        }
    }

    isOptionActive(item: any) {
        if (this.pick.selected.color === item.color) {
            return this.pick.selected.color === item.color;
        }
        return false;
    }

    onSelectedElem(evt: any) {
        const selectedElem = this.data[evt.idx];

        for (let realIndex = 0; realIndex < this.data.length; realIndex++) {
            if (this.data[realIndex] === selectedElem) {
                Object.assign(evt, { idx: realIndex });
            }
        }
        // Emit back, now with the (possible) corrected Obj @ 'idx' property:
        this.selectedElem.emit(evt);
        this.open = false;
    }

}
