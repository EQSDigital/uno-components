import { Component, Input, Output, EventEmitter, OnChanges, ViewChildren, QueryList, SimpleChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Grid } from '../../../lib/grid';
import { Column } from '../../../lib/data-set/column';
import { ColumnTitleComponent } from '../cells/column-title.component';

@Component({
    selector: '[ng2-st-thead-titles-row]',
    template: `
        <th *ngIf="colorRow" [style.padding]="0"></th>
        <th ng2-st-checkbox-select-all
            *ngIf="isMultiSelectVisible"
            class="ng2-smart-th ng2-smart-action-multiple-select"
            [grid]="grid"
            (click)="selectAllRows.emit($event.target.checked)">
        </th>

        <!-- Empty th for the collapsed icon -->
        <th *ngIf="tableCollapsible.isCollapsible" class="ng2-smart-th"></th>

        <!-- COLUMNS TITLE -->
        <ng-container *ngFor="let column of grid.dataSet.columns">
            <th *ngIf="column.isVisibled"
                [id]="column.id"
                class="ng2-smart-th slds-p-bottom--xx-small"
                [class.columns]="column.title"
                [style.width]="column.width"
                [style.cursor]="column.isSortable || column.filter ? 'pointer' : 'default'"
                (mouseenter)="onMouseEnter(column)"
                (mouseleave)="onMouseLeave(column)">
                    <ng2-st-column-title
                        [grid]="grid"
                        [column]="column"
                        (sort)="sort.emit($event)"
                        (hidePopovers)="hidePopovers()"
                        (getColumnFilters)="getColumnFilters.emit($event)">
                    </ng2-st-column-title>
            </th>
        </ng-container>

        <!-- ACTIONS -->
        <th ng2-st-actions-title *ngIf="showActionColumnRight" [grid]="grid" class="slds-p-bottom--xx-small"></th>
  `
})
export class TheadTitlesRowComponent implements OnChanges, OnDestroy {
    @Input() grid: Grid;

    @Output() sort = new EventEmitter<any>();
    @Output() selectAllRows = new EventEmitter<boolean>();
    @Output() getColumnFilters = new EventEmitter<string>();

    @ViewChildren(ColumnTitleComponent) private columnsTitle: QueryList<ColumnTitleComponent>;

    colorRow: boolean;
    isMultiSelectVisible: boolean;
    showActionColumnRight: boolean;
    tableCollapsible: any;

    /**
     * Save the current field sort
     */
    currentFieldSort: string;

    private subscription$: Subscription;

    ngOnChanges(changes: SimpleChanges) {
        this.colorRow = this.grid.hasColorRow();
        this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
        this.showActionColumnRight = this.grid.showActionColumn('right');
        this.tableCollapsible = this.grid.getSetting('tableCollapsible');

        if (changes.grid && changes.grid.currentValue) {
            this.subscription$ = this.grid.source.onChanged().subscribe(() => {
                if (this.grid.source.getSort().length > 0) {
                    const column = this.columnsTitle.find((val) => val.column.id === this.grid.source.getSort()[0].field);

                    if (column) {
                        this.currentFieldSort = column.column.id;
                        this.columnsTitle.forEach((val) => val.showIcon = false);
                        column.showIcon = true;
                    }
                }
            });
        }
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }

    onMouseEnter(column: Column) {
        const columnTitle = this.columnsTitle.toArray().find((col) => col.column === column);

        if (this.columnHaveSortFilter(column) && !columnTitle.openPopoverOptions) {
            columnTitle.showIcon = true;
        }
    }

    onMouseLeave(column: Column) {
        const columnTitle = this.columnsTitle.toArray().find((col) => col.column === column);
        // THE ICON OF SORT/FILTER ONLY DESAPEAR IF POPOVER IS HIDDEN OR FIELD SORT DIFFERENT FROM THIS COLUMN
        if (!columnTitle.openPopoverOptions && column.id !== this.currentFieldSort) {
            columnTitle.showIcon = false;
        }
    }

    hidePopovers() {
        this.columnsTitle.forEach((val) => {
            if (val.column.id !== this.currentFieldSort) {
                val.openPopoverOptions = false;
                val.showIcon = false;
            }
        });
    }

    private columnHaveSortFilter(column: Column) {
        return column.isSortable || column.filter;
    }
}
