import { Component, OnChanges, AfterContentInit, Input, Output, EventEmitter, ElementRef, Renderer2, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Grid } from '../../lib/grid';
import { TbodyCollapseContentDirective } from './tbody-collapse-content.directive';
import { Row } from '../../../../lib/table/lib/data-set/row';

@Component({
    selector: '[ng2-st-tbody]',
    styleUrls: ['./tbody.component.scss'],
    templateUrl: './tbody.component.html'
})
export class Ng2SmartTableTbodyComponent implements OnChanges, AfterContentInit, OnDestroy {

    // Recieve, here, the Table's "editingForm":
    @Input() editingFormGroup: FormGroup;

    @Input() grid: Grid;

    @Input() deleteConfirm: EventEmitter<any>;

    @Input() editConfirm: EventEmitter<any>;

    @Input() rowClassFunction: Function;

    @Input() collapseTableContent: TbodyCollapseContentDirective;

    @Input() updateColumnList: any;

    @Input() cancelEdit: EventEmitter<any>;

    @Input() userRowSelect: EventEmitter<any>;

    @Output() save = new EventEmitter<any>();

    @Output() cancel = new EventEmitter<any>();

    @Output() edit = new EventEmitter<any>();

    @Output() editSave = new EventEmitter<any>();

    @Output() delete = new EventEmitter<any>();

    @Output() rowActionCustomEvent = new EventEmitter<any>();

    @Output() rowActionDownloadCustomEvent = new EventEmitter<any>();

    @Output() edited = new EventEmitter<any>();

    @Output() userSelectRow = new EventEmitter<any>();

    @Output() editRowSelect = new EventEmitter<any>();

    @Output() multipleSelectRow = new EventEmitter<any>();

    @Output() rowHover = new EventEmitter<any>();

    @Output() selectedElem = new EventEmitter<any>();

    tableBody: HTMLElement;
    actionIcons = [];
    colorRow: boolean;
    isMultiSelectVisible: boolean;
    showActionColumnRight: boolean;
    mode: string;
    editInputClass: string;
    isActionAdd: boolean;
    isActionEdit: boolean;
    isActionDelete: boolean;
    tableCollapsible: any;
    rowsCollapsible: boolean[] = [];
    noDataMessage: boolean;
    getExtraColumn: number;

    private subscription$ = new Subscription();

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef
    ) { }

    // ----------------------------
    // Component's life cycle methods used:
    // ----------------------------
    ngAfterContentInit() {
        this.tableBody = this.element.nativeElement;

        // LISTNING THE DataSource FOR ADD PADDING ON THE FIRST COLUMN
        this.subscription$.add(
            this.grid.source.onChanged().subscribe((val) => {
                if (val.elements.length > 0 && !this.grid.hasColorRow()) {
                    this.cdr.detectChanges();
                    const rows: HTMLCollection = this.tableBody.getElementsByTagName('tr');
                    for (let i = 0; i < rows.length; i++) {
                        const col: HTMLTableDataCellElement = rows.item(i).getElementsByTagName('td')[0];
                        this.renderer.setStyle(col, 'padding-left', '1.25rem');
                    }
                }
            })
        );
    }

    ngOnChanges() {
        this.colorRow = this.grid.hasColorRow();
        this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
        this.mode = this.grid.getSetting('mode');
        this.editInputClass = this.grid.getSetting('edit.inputClass');
        this.showActionColumnRight = this.grid.showActionColumn('right');
        this.isActionAdd = this.grid.getSetting('actions.add');
        this.isActionEdit = this.grid.getSetting('actions.edit');
        this.isActionDelete = this.grid.getSetting('actions.delete');
        this.tableCollapsible = this.grid.getSetting('tableCollapsible');
        this.noDataMessage = this.grid.getSetting('noDataMessage');
        this.getExtraColumn = (this.isActionAdd || this.isActionEdit || this.isActionDelete) ? 1 : 0;
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }

    // ----------------------------
    // Bindings:
    // ----------------------------

    onRowHover(row: Row) {
        // Emit it back in case someone needs at TS/HTML <uno-smart-table />'s instalation:
        this.rowHover.emit(row);
    }

    onRowHoverEnter(rowObj: Row) {
        // Hovering only happens if NO row is being edited or created:
        if (this.rowEditing() || this.grid.createFormShown) { return false; }

        const hoveredTR = this.tableBody.children[rowObj.index + this.howManyItemsAreOpenBeforeMe(rowObj.index)];
        const actionIcons = this.getThisRowActionIcons(hoveredTR);
        const configBorderType = this.grid.getSetting('hoveringRow');

        // BORDER hovered <tr> ?:
        if (configBorderType) {
            this.renderer.setAttribute(hoveredTR, 'style', configBorderType.css);
        }
        // SHOW '.ng2-smart-actions' Actions <td> ICONS for this hovered <tr>:
        for (let i = 0; i < actionIcons.length; i++) {
            this.renderer.setStyle(actionIcons[i], 'visibility', 'visible');
        }
    }

    onRowHoverLeave(rowObj: Row) {
        // Hovering only happens if NO row is being edited or created:
        if (this.rowEditing() || this.grid.createFormShown) { return false; }

        const hoveredTR = this.tableBody.children[rowObj.index + this.howManyItemsAreOpenBeforeMe(rowObj.index)];
        const actionIcons = this.getThisRowActionIcons(hoveredTR);
        const configBorderType = this.grid.getSetting('hoveringRow');
        const cssProperty = configBorderType ? configBorderType.css : null;

        // UNBORDER hovered <tr>:
        if (cssProperty) {
            this.renderer.setAttribute(hoveredTR, 'style', cssProperty.split(':')[0] + ': none;');
        }
        // HIDE '.ng2-smart-actions' Actions <td> ICONS for this hovered <tr>:
        for (let i = 0; i < actionIcons.length; i++) {
            this.renderer.setStyle(actionIcons[i], 'visibility', 'hidden');
        }

    }

    // ----------------------------
    // AUX functions
    // ----------------------------

    // Must check if any Action icon exists and, if so, if they are placed at the LEFT or at the RIGHT side:
    getThisRowActionIcons(row: any) {
        const actionIconsRight = this.showActionColumnRight ?
            row.lastElementChild.getElementsByClassName('ng2-smart-action-icon') : null;

        const haveActionIcons = actionIconsRight ? true : false;

        const actionIcons = haveActionIcons ? actionIconsRight : [];

        return actionIcons;
    }

    /**
     * Check if ANY row is being edited.
     */
    rowEditing(): boolean {
        const rowsInEditing = this.grid.dataSet.rows.filter((row: Row) => row.isInEditing === true);

        return rowsInEditing.length > 0 ? true : false;
    }

    rowCollapsed(evt: Event, row: Row) {
        evt.stopPropagation();

        if (!row.isInEditing) {
            this.collapseRow(row);
        }
    }

    collapseRow(row: Row) {
        this.rowsCollapsible[row.index] = !this.rowsCollapsible[row.index];
    }

    /**
     * This method emit the row to instalation and expand the row.
     *
     * @param row - The row to be edited.
     */
    onEditRowCollappsed(row: Row) {
        this.edit.emit(row);
        if (this.tableCollapsible.isCollapsible) {
            this.rowsCollapsible[row.index] = true;
        }
    }

    /**
     * This method close the expanded row.
     *
     * @param row - The row where cancel accours.
     */
    onEditCancel(row: Row) {
        this.rowsCollapsible[row.index] = false;
        this.cancelEdit.emit();
    }

    /**
     * This method count how many rows are collapsed before row index.
     * It's necessary to hovering the correct row.
     *
     * @param rowIdx - The index of the row.
     */
    howManyItemsAreOpenBeforeMe(rowIdx: number): number {
        let count = 0;

        if (this.rowsCollapsible.length > 0) {
            for (let i = 0; i < rowIdx; i++) {
                if (this.rowsCollapsible[i]) {
                    count++;
                }
            }
        }

        return count;
    }

    onSelectRow(row: Row, evt: Event) {
        evt.stopPropagation();
        this.multipleSelectRow.emit(row);
    }
}
