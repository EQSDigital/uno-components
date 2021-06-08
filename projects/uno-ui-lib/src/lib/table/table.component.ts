import {
    Component, OnDestroy, ElementRef, Renderer2, OnChanges, SimpleChanges,
    Input, Output, EventEmitter, ContentChild, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Grid } from './lib/grid';
import { DataSource } from './lib/data-source/data-source';
import { Row } from './lib/data-set/row';
// Our Interface Models library for the uno-smart-table - special the enormous config Object:
import { UnoSmartTableSettings, RowActionCustom } from './table.models';

import { deepExtend } from './lib/helpers';
import { LocalDataSource } from './lib/data-source/local/local.data-source';
import { SetUpFormControllers } from './lib/data-set/form-validators';
import { TbodyCollapseContentDirective } from './components/tbody/tbody-collapse-content.directive';

@Component({
    selector: 'uno-smart-table',
    templateUrl: './table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnChanges, OnDestroy {

    /**
     * The data to be represented on table.
     */
    @Input() source: LocalDataSource;

    /**
     * The table settings.
     */
    @Input() settings = {} as UnoSmartTableSettings;

    /**
     * The columns that user want to see.
     */
    @Input() userSettings: any;

    @Input() updateColumnList: any;

    @Input() columnFilters: any[];

    /**
     * Triggered once a row is selected.
     */
    @Output() rowSelect = new EventEmitter<any>();

    /**
     * Trigger only on a user click a event.
     */
    @Output() userRowSelect = new EventEmitter<any>();

    /**
     * Trigger when user hover mouse.
     */
    @Output() rowHover: EventEmitter<any> = new EventEmitter<any>();

    // Actions events:
    @Output() create = new EventEmitter<any>();
    @Output() createSave = new EventEmitter<any>();
    @Output() cancelCreate = new EventEmitter<any>();
    @Output() edit = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();
    @Output() editSave = new EventEmitter<any>();
    @Output() cancelEdit = new EventEmitter<any>();
    @Output() rowActionCustomEvent = new EventEmitter<any>();
    @Output() rowActionDownloadCustomEvent = new EventEmitter<any>();
    @Output() rowHeaderActionCustomEvent = new EventEmitter<any>();
    @Output() selectedElem = new EventEmitter<any>();
    // Actions confirmation events:
    @Output() deleteConfirm = new EventEmitter<any>();
    @Output() editConfirm = new EventEmitter<any>();
    @Output() createConfirm = new EventEmitter<any>();
    // Several Grid's internal affairs - like pagination, sort, filter, etc - that need to be passed to EXTERIOR API:
    // Important when you have the API url to call services OUTSIDE the Table components - at its installation
    @Output() internalAction = new EventEmitter<any>();

    @Output() searchTerm = new EventEmitter<string>();

    @Output() formChanges = new EventEmitter<any>();

    @Output() saveOptions = new EventEmitter<any>();

    @Output() getColumnFilters = new EventEmitter<string>();

    /**
     * Set content for collapsible table.
     */
    @ContentChild(TbodyCollapseContentDirective) collapseTableContent: TbodyCollapseContentDirective;

    // THE editing Form:
    form: FormGroup = new FormGroup({});
    // You need the <form /> DOM to navigate to the "submit" button, lost in so many nested components! ;-):
    formHTML: HTMLElement;
    submitted = false;

    // Global vars to be refreshed on every ngOnChanges():
    tableClass: string;
    tableId: string;
    isHideHeader: boolean;
    rowClassFunction: Function;

    grid: Grid;
    @ViewChild('unoSmartTable', { static: true }) private table: ElementRef<HTMLElement>;
    private subscriptions$ = new Subscription();

    private defaultSettings: UnoSmartTableSettings = {
        mode: 'inline',
        selectMode: 'single',
        colorRow: false,
        hideHeader: false,
        noDataMessage: 'No data found',
        // hoveringRow: { css: ''}, => just don't exist, if no bordering row on hovering is pretended (coded inside component this way)

        tableCollapsible: {
            isCollapsible: false,
            iconClose: '',
            iconOpen: ''
        },

        attr: {
            id: '',
            class: '',
        },
        filter: {
            inputClass: '',
        },

        rowPopoverErrors: false,
        popoverTheme: 'info',
        headerActions: [],
        actions: {
            position: 'right',
            columnTitle: '',
            add: false,
            edit: false,
            editRowProperty: null,
            delete: false,
            deleteRowProperty: null,
            custom: [{} as RowActionCustom],
        },
        add: {
            inputClass: '',
            addButtonContent: 'Add New',
            createButtonContent: 'Create',
            cancelButtonContent: 'Cancel',
            confirmCreate: false,
        },
        edit: {
            inputClass: '',
            editButtonContent: 'Edit',
            saveButtonContent: 'Save',
            cancelButtonContent: 'Cancel',
            confirmSave: false,
        },
        delete: {
            deleteButtonContent: 'Delete',
            confirmDelete: false,
        },
        showSearch: false,

        columns: {},

        rowClassFunction: () => '',
        filterType: 'single'
    };

    constructor(
        private render: Renderer2,
        private cdRef: ChangeDetectorRef
    ) {
        /*
         * First, it's necessary initiate the grid whit the basic elements.
         * A empty instance of DataSource and default settings.
         */
        this.initGrid();

        // Initalize our (Angular reactive Form) FormGroup:
        this.subscriptions$.add(
            this.form.valueChanges.subscribe((val) => {
                this.formChanges.emit(val);

                SetUpFormControllers.enableControlWaitingValue(this.grid, this.form);
            })
        );

        this.tableId = this.grid.getSetting('attr.id');
        this.tableClass = this.grid.getSetting('attr.class');
        this.isHideHeader = this.grid.getSetting('hideHeader');
        this.rowClassFunction = this.grid.getSetting('rowClassFunction');
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.settings && changes.settings.currentValue) {
            this.grid.settings = this.prepareSettings();

            // Only set form if table is add or edit in line
            if (this.grid.settings.actions.add || this.grid.settings.actions.edit) {
                SetUpFormControllers.doFormControllersOn(this.grid, this.form);
            }
        }

        if (changes.source && changes.source.currentValue) {
            this.grid.source = this.source;
        }

        if (changes.updateColumnList && changes.updateColumnList.currentValue) {
            this.grid.updateSetting(this.updateColumnList);
        }

        if (changes.userSettings && changes.userSettings.currentValue) {
            this.grid.settings = this.prepareUserSettings();
        }

        if (changes.columnFilters && changes.columnFilters.currentValue) {
            Object.keys(this.columnFilters).forEach((column) => {
                this.grid.setColumnFilters(column, this.columnFilters[column]);
            });
        }
    }

    ngOnDestroy() {
        this.subscriptions$.unsubscribe();
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            // Just in case "someone" is able to un--disable submit button! ;-)
            console.error('this.editingForm, @ TableComponent, has been SUBMITED but it\'s INVALID... no submission was made!');
            return;
        }
    }

    // ===========================
    // Grid manipulation Events:
    // ===========================

    // Open to EDIT:
    editRowSelect(row: Row) {
        // Open it/them:
        if (this.grid.getSetting('selectMode') === 'multi') {
            this.onMultipleSelectRow(row);
        } else {
            this.onSelectRow(row);
        }
        // UNBORDER hovered <tr>:
        const hoveredTR = this.table.nativeElement.querySelectorAll('table > tbody')[0].children;
        const configBorderType = this.grid.getSetting('hoveringRow');

        // Deal with hovering row border
        if (this.grid.getSetting('hoveringRow')) {
            hoveredTR[row.index].setAttribute('style', configBorderType.css.split(':')[0] + ': none;');
        }

        row.cells.forEach((cell) =>
            this.form.controls[cell.column.id].setValue(cell.value)
        );
    }

    // Open to CREATE:
    createRowNew() {
        this.form.reset();
        this.grid.dataSet.createNewRow();
        this.grid.createFormShown = true;

        this.cdRef.detectChanges();

        // Send back the browser event, in case someone needs it:
        this.create.emit(this.source);
    }

    onUserSelectRow(row: Row) {
        if (this.grid.getSetting('selectMode') !== 'multi') {
            this.grid.selectRow(row);
            this.emitUserSelectRow(row);
            this.emitSelectRow(row);
        }
    }

    onRowHover(row: Row) {
        this.rowHover.emit(row);
    }

    multipleSelectRow(row: Row) {
        this.grid.multipleSelectRow(row);
        this.emitUserSelectRow(row);
        this.emitSelectRow(row);
    }

    onSelectAllRows(value: boolean) {
        this.grid.selectAllRows(value);

        this.emitUserSelectRow(null);
        this.emitSelectRow(null);
    }

    onSelectRow(row: Row) {
        this.grid.selectRow(row);
        this.emitSelectRow(row);
    }

    onMultipleSelectRow(row: Row) {
        this.emitSelectRow(row);
    }

    // ===========================
    // AUX Methods/Functions:
    // ===========================
    /**
     * This method set the first data and settings of the table.
     */
    initGrid() {
        this.source = this.prepareSource();
        this.grid = new Grid(this.source, this.prepareSettings(), this.internalAction);

        this.subscriptions$.add(
            this.grid.onSelectRow().subscribe((row) => this.emitSelectRow(row))
        );
    }

    /**
     * This method return a instance of DataSource.
     */
    prepareSource(): LocalDataSource {
        if (this.source instanceof DataSource) {
            return this.source;
        }

        return new LocalDataSource();
    }

    /**
     * This method return a object of UnoSmartTableSettings.
     */
    prepareSettings(): UnoSmartTableSettings {
        return deepExtend({}, this.defaultSettings, this.settings);
    }

    prepareUserSettings(): UnoSmartTableSettings {
        this.grid.settings.columns = deepExtend(this.grid.settings.columns, this.userSettings);
        return this.grid.settings;
    }

    sort($event: any) {
        this.resetAllSelector();
    }

    filter($event: any) {
        this.resetAllSelector();
    }

    onClickIconOptions(status: boolean) {
        // status ? this.resizableGrid() : this.removeResizableGrid();
    }

    onSaveOptions(obj: any) {
        this.saveOptions.emit(obj);
    }

    private resetAllSelector() {
        // this.isAllSelected = false;
    }

    private emitUserSelectRow(row: Row) {
        const selectedRows = this.grid.getSelectedRows();

        this.userRowSelect.emit({
            data: row ? row.data : null,
            isSelected: row ? row.getIsSelected() : null,
            source: this.source,
            selected: selectedRows && selectedRows.length ? selectedRows.map((r: Row) => r.data) : []
        });
    }

    private emitSelectRow(row: Row) {
        this.rowSelect.emit({
            data: row ? row.data : null,
            isSelected: row ? row.getIsSelected() : null,
            source: this.source,
        });
    }

    private removeResizableGrid() {
        const row: HTMLTableRowElement = this.table.nativeElement.getElementsByTagName('tr')[0];
        // const cols: HTMLCollection = row ? row.children : undefined;
        const cols: HTMLCollection = row ? row.getElementsByClassName('columns') : undefined;

        if (!cols) {
            return;
        }

        for (let i = 0; i < cols.length; i++) {
            cols.item(i).children[1].remove();
        }
    }

    private resizableGrid() {
        const row: HTMLTableRowElement = this.table.nativeElement.getElementsByTagName('tr')[0];
        // const cols: HTMLCollection = row ? row.children : undefined;
        const cols: HTMLCollection = row ? row.getElementsByClassName('columns') : undefined;

        if (!cols) {
            return;
        }

        this.render.setStyle(this.table.nativeElement, 'overflow', 'hidden');

        const tableHeight = this.table.nativeElement.offsetHeight;

        for (let i = 0; i < cols.length; i++) {
            const div = this.createDiv(tableHeight);
            this.render.appendChild(cols.item(i), div);
            this.render.setStyle(cols.item(i), 'position', 'relative');
            this.setListners(div);
        }
    }

    private setListners(div: HTMLElement) {
        let pageX: number;
        let curCol: HTMLElement;
        let nxtCol: any;
        let curColWidth: number;
        let nxtColWidth: number;

        this.subscriptions$.add(
            this.render.listen(div, 'mousedown', (e: any) => {
                curCol = e.target.parentElement;
                nxtCol = curCol.nextElementSibling;
                pageX = e.pageX;

                const padding = this.paddingDiff(curCol);

                curColWidth = curCol.offsetWidth - padding;

                if (nxtCol) {
                    nxtColWidth = nxtCol.offsetWidth - padding;
                }
            })
        );

        // this.subscriptions$.add(
        //     this.render.listen(div, 'mouseover', (e: Event) => {
        //         this.render.setStyle(e.target, 'border-right', '1px solid var(--light-blue-grey)');
        //     })
        // );

        // this.subscriptions$.add(
        //     this.render.listen(div, 'mouseout', (e: Event) => {
        //         this.render.setStyle(e.target, 'border-right', '');
        //     })
        // );

        this.subscriptions$.add(
            this.render.listen(document, 'mousemove', (e) => {
                if (curCol) {
                    const diffX = e.pageX - pageX;

                    if (nxtCol) {
                        this.render.setStyle(nxtCol, 'width', `${nxtColWidth - (diffX)}px`);
                    }

                    this.render.setStyle(curCol, 'width', `${curColWidth + diffX}px`);
                }
            })
        );

        this.subscriptions$.add(
            this.render.listen(document, 'mouseup', () => {
                curCol = undefined;
                nxtCol = undefined;
                pageX = undefined;
                nxtColWidth = undefined;
                curColWidth = undefined;
            })
        );
    }

    private createDiv(height: number) {
        const div: HTMLElement = this.render.createElement('div');
        this.render.setStyle(div, 'top', '0');
        this.render.setStyle(div, 'right', '0');
        this.render.setStyle(div, 'width', '5px');
        this.render.setStyle(div, 'position', 'absolute');
        this.render.setStyle(div, 'cursor', 'col-resize');
        this.render.setStyle(div, 'userSelect', 'none');
        this.render.setStyle(div, 'border-right', '1px solid var(--light-blue-grey)');
        this.render.setStyle(div, 'height', `${height}px`);

        return div;
    }

    private paddingDiff(col: HTMLElement) {

        if (this.getStyleVal(col, 'box-sizing') === 'border-box') {
            return 0;
        }

        const padLeft = this.getStyleVal(col, 'padding-left');
        const padRight = this.getStyleVal(col, 'padding-right');

        return (Number(padLeft) + Number(padRight));

    }

    private getStyleVal(elm: HTMLElement, css: string) {
        return (window.getComputedStyle(elm, null).getPropertyValue(css));
    }
}
