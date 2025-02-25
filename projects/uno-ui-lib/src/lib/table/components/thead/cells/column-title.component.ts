import { Component, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { Column } from '../../../lib/data-set/column';
import { Grid } from '../../../lib/grid';
import { ButtonDirective } from '../../../../button/button.directive';

import { PopoverTriggerDirective } from '../../../../popover/popover.component';
import { IconComponent } from '../../../../icon/icon.component';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

enum SortDirectionEnum {
    ASC = 'asc',
    DESC = 'desc'
}

@Component({
    selector: 'ng2-st-column-title',
    templateUrl: 'column-title.component.html',
    styleUrls: ['column-title.component.scss'],
    standalone: true,
    imports: [TranslateDirective, IconComponent, PopoverTriggerDirective, ButtonDirective, TranslatePipe]
})
export class ColumnTitleComponent implements OnChanges, OnDestroy {
    @Input() grid: Grid;

    @Input() column: Column;

    @Output() sort = new EventEmitter();

    @Output() hidePopovers = new EventEmitter();

    @Output() getColumnFilters = new EventEmitter<string>();

    currentDirection = '';
    openPopoverOptions = false;
    showIcon = false;

    sortDirectionEnum = SortDirectionEnum;

    private subscriptions$ = new Subscription();

    ngOnChanges(changes: SimpleChanges) {
        if (changes.grid && changes.grid.currentValue) {
            this.subscriptions$.add(this.grid.source.onChanged()
                .subscribe(() => {
                    const sortConf = this.grid.source.getSort();

                    if (sortConf.length > 0 && sortConf[0]['field'] === this.column.id) {
                        this.currentDirection = sortConf[0]['direction'];
                    } else {
                        this.currentDirection = '';
                    }
                })
            );
        }
    }

    ngOnDestroy() {
        this.subscriptions$.unsubscribe();
    }

    onClick() {
        const currentState = this.openPopoverOptions;
        this.hidePopovers.emit();
        this.openPopoverOptions = !currentState;
        this.showIcon = !currentState;

        if (this.grid.source.getSort()[0] && this.grid.source.getSort()[0].field === this.column.id ||
            this.grid.source.getFilter() && this.grid.source.getFilter().length > 0 && this.grid.source.getFilter()[0].field === this.column.id) {
            this.showIcon = true;
        }

        if (this.openPopoverOptions && this.column.filters.length === 0) {
            this.getColumnFilters.emit(this.column.id);
        }
    }

    onCheckFilter(obj: any) {
        obj.checked = !obj.checked;
    }

    onApplyFilter() {
        const filters = this.column.filters.filter((val) => val.checked === true).map((val) => val.name);

        /* If number of filters selected it's equals to the number of the column.filters array, it's necessary remove the field from array.
         * only apply the filter if number of filters selected it's different from 0 and different from the size of the column.filters array.
         */
        if (filters.length === this.column.filters.length && this.grid.source.getFilter().length > 0) {
            this.grid.source.removeFilter(this.column.id);
        } else if (filters.length > 0 && filters.length !== this.column.filters.length) {
            /* If 'filterType' is of type 'single', it is necessary to clear the saved filter
             * and reset the filters of the last filtered column.
             */
            if (this.grid.getSetting('filterType') === 'single' && this.grid.source.getFilter().length > 0) {
                // The array of saved filter only have one element on array.
                const column = this.grid.dataSet.columns.find((col: Column) => col.id === this.grid.source.getFilter()[0].field);
                column.filters.forEach((obj: any) => obj.checked = true);

                this.grid.source.resetFilter(true);
            }


            this.grid.source.addFilter({
                field: this.column.id,
                search: filters
            });
        }

        this.openPopoverOptions = false;
    }

    _sort(event: any, direction: SortDirectionEnum) {
        event.preventDefault();
        this.grid.source.setSort([
            {
                field: this.column.id,
                direction: direction
            },
        ]);

        this.openPopoverOptions = false;

        this.sort.emit(null);
    }

    onSearchFilter(term: string) {
        this.column.searchDisplayedFilters(term);
    }

    onSelectAll() {
        this.column.selectAllFilters();
    }

    onClearAll() {
        this.column.removeAllFilters();
    }
}
