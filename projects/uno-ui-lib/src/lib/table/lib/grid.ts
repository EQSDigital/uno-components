import { Directive, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';

import { Deferred, getDeepFromObject } from './helpers';
import { Column } from './data-set/column';
import { Row } from './data-set/row';
import { DataSet } from './data-set/data-set';
import { UnoSmartTableSettings } from '../table.interfaces';
import { LocalDataSource } from './data-source/local/local.data-source';

@Directive()
export class Grid implements OnDestroy {
    private _createFormShown: boolean;

    private _source: LocalDataSource;
    
    private _settings: UnoSmartTableSettings;

    private _dataSet: DataSet;

    private onSelectRowSource = new Subject<any>();

    private subscriptions$ = new Subscription();

    constructor(
        source: LocalDataSource,
        settings: UnoSmartTableSettings,
        private internalAction: EventEmitter<any>
    ) {
        this._source = source;
        this._settings = settings;
        this._source = source;
        this._createFormShown = false;

        this._dataSet = new DataSet();
    }

    get createFormShown(): boolean {
        return this._createFormShown;
    }

    set createFormShown(val: boolean) {
        this._createFormShown = val;
    }

    get settings() {
        return this._settings;
    }

    set settings(settings: UnoSmartTableSettings) {
        this._settings = settings;

        this._dataSet.columns = this.getSetting('columns');

        if (this.createFormShown) {
            this._dataSet.newRow = null;
            this.dataSet.createNewRow();
        }

        this._source.refresh();
    }

    get dataSet(): DataSet {
        return this._dataSet;
    }

    get source(): LocalDataSource {
        return this._source;
    }

    set source(source: LocalDataSource) {
        this._source = source;

        source.getAll().then((val: any) => {
            if (val.length > 0) {
                this._source.refresh();
            }
        });

        this.subscriptions$.add(
            this._source.onChanged().subscribe(
                (changes: any) => {
                    // Emit back, signaling some grid's internal affair action has been asked for.
                    // Important when you have the API url to call services OUTSIDE the Table components - at its installation
                    // if (['filter', 'sort', 'refresh'].indexOf(changes['action']) !== -1) {
                    this.internalAction.emit(changes);
                    // }    // <= 'if' went to instalation TS!

                    // Meanwhile, keep updating rows internally...
                    // When internalAction reachs instalation, a new set of data will arrive, and grid will be re-done one last time
                    this.processDataChange(changes);
                }
            )
        );

        this.subscriptions$.add(
            this._source.onUpdated().subscribe((val: any) => {
                const changedRow = this._dataSet.findRowByData(val);
                // console.warn('DataSource UPDATED!', data, changedRow);
                changedRow.data = val;
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions$.unsubscribe();
    }

    showActionColumn(position: string): boolean {
        return this.isCurrentActionsPosition(position) && this.isActionsVisible();
    }

    isCurrentActionsPosition(position: string): boolean {
        return position === this.getSetting('actions.position');
    }

    isActionsVisible(): boolean {
        return (
            this.getSetting('actions.add')
            || this.getSetting('actions.edit')
            || this.getSetting('actions.delete')
            || this.getSetting('actions.custom').length
        );
    }

    isMultiSelectVisible(): boolean {
        return this.getSetting('selectMode') === 'multi';
    }

    hasColorRow(): boolean {
        return this.getSetting('colorRow');
    }

    getNewRow(): Row {
        return this._dataSet.newRow;
    }

    updateSetting(obj: any) {
        const column = this._dataSet.columns.find((col: Column) => col.id === Object.keys(obj)[0]);

        if (column) {
            column.editor.config['list'] = obj[Object.keys(obj)[0]];
        }
    }

    getSetting(name: string, defaultValue?: any): any {
        return getDeepFromObject(this._settings, name, defaultValue);
    }

    setColumnFilters(key: string, values: string[]) {
        this.dataSet.getColumnById(key).filters = values;
    }

    /**
     * This method set a row selected.
     *
     * @param row - The row to be selected.
     */
    selectRow(row: Row) {
        this._dataSet.selectRow(row);
    }

    multipleSelectRow(row: Row) {
        this._dataSet.multipleSelectRow(row);
    }

    onSelectRow(): Observable<any> {
        return this.onSelectRowSource.asObservable();
    }

    /**
     * This method set the propertie isInEditing of class Row to true.
     *
     * @param row - The row to be editing.
     */
    edit(row: Row) {
        row.isInEditing = true;
    }

    create(row: Row, confirmEmitter: EventEmitter<any>) {
        const deferred = new Deferred();
        deferred.promise.then((newData) => {
            newData = newData ? newData : row.getNewData();
            this._source.prepend(newData).then(() => {
                this.createFormShown = false;
            });
        }, () => this.createFormShown = false)
            .catch((err) => {
                // doing nothing
            });

        if (this.getSetting('add.confirmCreate')) {
            confirmEmitter.emit({
                newData: row.getNewData(),
                source: this._source,
                confirm: deferred,
            });
        } else {
            deferred.resolve();
        }
    }

    save(row: Row, confirmEmitter: EventEmitter<any>) {
        const deferred = new Deferred();
        deferred.promise.then((newData) => {
            newData = newData ? newData : row.getNewData();
            this._source.update(row.data, newData).then(() => {
                row.isInEditing = false;
            });
        }, () => row.isInEditing = false)
            .catch((err) => {
                // doing nothing
            });

        if (this.getSetting('edit.confirmSave')) {
            confirmEmitter.emit({
                data: row.data,
                newData: row.getNewData(),
                source: this._source,
                confirm: deferred,
            });
        } else {
            deferred.resolve();
        }
    }

    delete(row: Row, confirmEmitter: EventEmitter<any>) {
        const deferred = new Deferred();
        deferred.promise.then(() => {
            this._source.remove(row.data);
        }).catch((err) => {
            // doing nothing
        });

        if (this.getSetting('delete.confirmDelete')) {
            confirmEmitter.emit({
                data: row.data,
                source: this._source,
                confirm: deferred,
            });
        } else {
            deferred.resolve();
        }
    }

    processDataChange(changes: any) {
        if (this.shouldProcessChangeInternally(changes)) {
            // Update the grid with the new elements:
            this._dataSet.data = changes['elements'];

            if (this.getSetting('selectMode') !== 'multi') {
                const row = this.determineRowToSelect(changes);

                if (row) {
                    this.onSelectRowSource.next(row);
                }
            }
        }
    }

    shouldProcessChangeInternally(changes: any): boolean {
        if (['filter', 'sort', 'remove', 'refresh', 'load'].indexOf(changes['action']) !== -1) {
            return true;
        } else if (['prepend', 'append'].indexOf(changes['action']) !== -1) {
            return true;
        }

        return false;
    }

    determineRowToSelect(changes: any): Row {
        if (['load', 'filter', 'sort', 'refresh'].indexOf(changes['action']) !== -1) {
            return this._dataSet.select();
        }

        if (changes['action'] === 'remove') {
            if (changes['elements'].length === 0) {
                // we have to store which one to select as the data will be reloaded
                this._dataSet.willSelectLastRow();
            } else {
                return this._dataSet.selectPreviousRow();
            }
        }

        if (changes['action'] === 'append') {
            // we have to store which one to select as the data will be reloaded
            this._dataSet.willSelectLastRow();
        }

        if (changes['action'] === 'add') {
            return this._dataSet.selectFirstRow();
        }

        if (changes['action'] === 'update') {
            return this._dataSet.selectFirstRow();
        }

        if (changes['action'] === 'prepend') {
            // we have to store which one to select as the data will be reloaded
            this._dataSet.willSelectFirstRow();
        }

        return null;
    }

    prepareSource(source: LocalDataSource): LocalDataSource {
        const initialSource: any = this.getInitialSort();

        if (initialSource && initialSource['field'] && initialSource['direction']) {
            source.setSort([initialSource], false);
        }

        return source;
    }

    getInitialSort() {
        const sortConf: any = {};
        this._dataSet.columns.forEach((column: Column) => {
            if (column.isSortable && column.defaultSortDirection) {
                sortConf['field'] = column.id;
                sortConf['direction'] = column.defaultSortDirection;
                sortConf['compare'] = column.getCompareFunction();
            }
        });

        return sortConf;
    }

    getSelectedRows(): Array<any> {
        return this._dataSet.rows.filter((r: Row) => r.isSelected);
    }

    selectAllRows(status: any) {
        this._dataSet.rows.forEach((r: Row) => r.isSelected = status);
    }
}
