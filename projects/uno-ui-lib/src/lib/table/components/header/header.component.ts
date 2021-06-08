import { Component, OnChanges, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { cloneDeep } from 'lodash';

import { Grid } from '../../lib/grid';
import { ActionCustom } from '../../table.models';
import { Column } from '../../lib/data-set/column';
import { Row } from '../../lib/data-set/row';

@Component({
    selector: 'header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnChanges {
    @Input() grid: Grid;

    @Input() headerSettings: any;

    @Output() create = new EventEmitter<any>();

    @Output() searchTerm = new EventEmitter<string>();

    @Output() customAction = new EventEmitter<ActionCustom>();

    @Output() clickIconOptions = new EventEmitter<boolean>();

    @Output() saveOptions = new EventEmitter<any>();

    /**
     * The main actions there are the icons I can see on the header.
     */
    mainActions: ActionCustom[];

    /**
     * The other actions there are the icons go to popover.
     */
    otherActions: ActionCustom[];

    /**
     * Variable to control the popover with sort and filter.
     */
    openPopover = false;

    /**
     * Variable to control the popover with options of the table.
     */
    openPopoverOptions = false;

    /**
     * Variable to control the show/hide button save on popover options.
     */
    showButtonSave = false;

    /**
     * Variable with all actions of the header.
     */
    private headerActions: ActionCustom[];

    private columnsFirstState: Column[];

    ngOnChanges() {
        this.headerActions = this.grid.settings.headerActions;

        // ONLY SHOW 4 ICONS ON HEADER, THE OTHERS GO TO POPOVER.
        if (this.grid.settings.actions.add) { // CHECK IF ADD IS EDIT IN LINE
            this.mainActions = this.headerActions.slice(0, 2);
            this.otherActions = this.headerActions.slice(2, this.headerActions.length);
        } else {
            this.mainActions = this.headerActions.slice(0, 3);
            this.otherActions = this.headerActions.slice(3, this.headerActions.length);
        }

        this.columnsFirstState = cloneDeep(this.grid.dataSet.columns);
    }

    onAdd() {
        // Check user is not EDITING any row:
        // Disable CREATE possibility since they use the same "editingForm" form!
        // Side effects are obvious: validators coloring gets all mixed up
        // - SAME (component) element is being scaned in more than one place (row).
        if (this.grid.dataSet.rows.filter((row: Row) => row.isInEditing).length > 0) {
            return false;
            // But inform the user @ hoverIn()!
        }

        this.create.emit();
    }

    hoverIn() {
        if (this.grid.dataSet.rows.filter((row: Row) => row.isInEditing).length > 0) {
            this.openPopover = true;
        }
    }

    onCheckColumn(column: Column) {
        if (!column.isRequired) {
            column.isVisibled = !column.isVisibled;

            let findDiferences = false;
            this.columnsFirstState.forEach((col: Column) => {
                if (col.isVisibled !== column.isVisibled) {
                    findDiferences = true;
                }
            });

            if (findDiferences) {
                this.showButtonSave = true;
            } else {
                this.showButtonSave = false;
            }
        }
    }

    onClickOptions() {
        this.openPopoverOptions = !this.openPopoverOptions;
        this.clickIconOptions.emit(this.openPopoverOptions);
        this.columnsFirstState = cloneDeep(this.grid.dataSet.columns);
    }

    onSave() {
        const obj = [];

        this.grid.dataSet.columns.forEach((column: Column) => {
            obj.push({
                parameterName: column.id,
                isVisible: column.isVisibled,
                isRequire: column.isRequired,
                isSorted: column.isSortable,
                isFilter: column.filter ? true : false,
                width: column.width
            });
        });

        this.saveOptions.emit(obj);
        this.openPopoverOptions = false;
        this.showButtonSave = false;
    }
}
