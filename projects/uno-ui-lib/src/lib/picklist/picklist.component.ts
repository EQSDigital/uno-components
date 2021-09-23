import {
    Component, ChangeDetectionStrategy, AfterContentInit, OnDestroy,
    Input, Output, EventEmitter, ContentChild, ViewChild, ElementRef
} from '@angular/core';
import { filter } from 'rxjs/operators';

import { PickItemDirective } from './pick-item.directive';
import { PickDirective } from '../pick/pick.directive';
import { toBoolean } from '../../utils/util';

@Component({
    selector: 'uno-picklist[unoPick]',
    templateUrl: './picklist.component.html',
    styleUrls: ['./picklist.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PicklistComponent implements AfterContentInit, OnDestroy {

    @Input() set data(data: any[]) {
        this._data = data;
        this.filterData();
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

    @Input() dropdownListClass: any;

    @Input() insertBlankElement: boolean;

    @Input() insertCreateButton: boolean;

    @Input() filterDataField: string | Function;

    @Input() filterPlaceholder = '';

    @Input() listSizeForFilter = 11;

    private filterActiveIndex = 0;
    private hasFilterFocus = false;
    filteredData: any[];
    userFilter = '';

    @Input() set open(value: boolean) {
        this._open = value;
        if (this.open && this.hasFilter) {
            setTimeout(() => this.focusFilter());
        }
    }
    get open() {
        return this._open;
    }

    @Input() closeClickOutside: boolean;

    @Input() isToOpenUp = false;

    @Input() addButton = 'Create Item';

    @Input() showCheckBox = false;

    @Input() set position(position: boolean | string) {
        this._position = toBoolean(position);
    }
    get position() {
        return this._position;
    }

    // ==============================================

    @Output() openChange = new EventEmitter();

    @Output() userChangedFilter = new EventEmitter();

    @Output() selectedElem = new EventEmitter<{ HTMLElement: HTMLElement, idx: number }>();

    @Output() scrollEndReached = new EventEmitter<any>();

    // ==============================================

    @ContentChild(PickItemDirective) itemTemplate: PickItemDirective;

    @ViewChild('filterInput') filterInput: ElementRef;

    get hasFilter() {
        // If the @Input()'s "filterDataField" and "listSizeForFilter" are declared @ instalation
        // - last one, defines a minimum number of the passed array elements so filter appears.
        return (
            typeof (this.filterDataField) !== 'undefined'
            &&
            this.data.length >= this.listSizeForFilter
        );
    }

    private _data: any[];
    private _open = false;
    private _changeSubscription: any;
    private _disabled = false;
    private _fluid = false;
    private _position = false;
    // userFilter = '';
    // private filterActiveIndex = 0;
    // private hasFilterFocus = false;

    constructor(public pick: PickDirective) { }

    ngAfterContentInit() {
        this._changeSubscription = this.pick.unoPickChange
            // Check it out: https://github.com/ngrx/platform/issues/564#issuecomment-344372463
            .pipe(
                filter(
                    () => !this.pick.isMultiple
                )
            )
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

    filterData() {
        this.filteredData = this._filterData();
        this.setFilterActive();         // Keep active index in bounds
    }

    _filterData() {
        if (!this.data || !this.hasFilter || !this.userFilter) {
            return this.data;
        }
        const
            inputedFilter = <any>this.filterDataField

            ;
        switch (typeof (inputedFilter)) {
            case 'string':
                return this.data.filter(
                    d => (
                        filter ? d[inputedFilter] : d.toString()
                    )
                        .toLowerCase()
                        .indexOf(this.userFilter.toLowerCase()) !== -1
                );
            case 'function':
                return this.data.filter(inputedFilter);
            default:
                throw new Error(
                    `Invalid <uno-picklist /> filter type (${typeof (inputedFilter)}). The filter must be empty, a field name or a filter function.`
                );
        }
    }

    isOptionActive(item: any) {
        if (this.pick.selected) {
            if (this.pick.isMultiple) {
                const sel = this.pick.selected.filter((elem) => elem.id === item.id)[0];
                if (sel) {
                    return sel.id === item.id;
                }
            } else {
                return this.pick.selected.id === item.id;
            }
        }
        return false;
    }

    onOptionHover(index: number) {
        if (!this.hasFilterFocus) { return; }
        this.filterActiveIndex = index;
    }

    filterChange(filterStr: string) {
        this.userFilter = filterStr;
        this.userChangedFilter.emit(filterStr);  // Warn the installation - might be needed, for custom multi-properties filtering.
        this.filterData();
    }

    setFilterActive(moves: number = 0, evt?: Event) {
        // We might don't have data, yet => no fields to filter (case of an Observable bringing our "filteredData" items to filter from)
        if (!this.filteredData) { return; }

        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        this.filterActiveIndex = Math.max(Math.min(this.filterActiveIndex + moves, this.filteredData.length - 1), 0);
    }

    onFilterPick() {
        if (!this.filteredData.length || this.filterActiveIndex < 0) { return; }
        this.pick.selectOption(this.filteredData[this.filterActiveIndex]);
    }

    focusFilter() {
        this.filterInput.nativeElement.focus();
    }

    onFilterFocus() {
        this.filterActiveIndex = 0;
        this.hasFilterFocus = true;
    }

    onFilterBlur() {
        this.filterActiveIndex = -1;
        this.hasFilterFocus = false;
    }

    onSelectedElem(evt: { HTMLElement: HTMLElement, idx: number }) {
        // This emitter is fired on Dropdown component, from which Picklist is done of.
        // Problem: on Dropdowns there's no filtering so idx param is, in fact, the index of the Dropdown list
        // With filtering (meaning a shorter Dropdown list), this idx is not real - is not related to the complete "items" list
        // Find it:
        const selectedElem = this.filteredData[evt.idx];

        for (let realIndex = 0; realIndex < this.data.length; realIndex++) {
            if (this.data[realIndex] === selectedElem) {
                Object.assign(evt, { idx: realIndex });
            }
        }
        // Emit back, now with the (possible) corrected Obj @ 'idx' property:
        this.selectedElem.emit(evt);
    }

}
