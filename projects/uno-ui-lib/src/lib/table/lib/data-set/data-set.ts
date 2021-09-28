import { Row } from './row';
import { Column } from './column';

export class DataSet {
    private _data: any[];

    private _columns: Column[];

    private _rows: Row[];

    private _selectedRow: Row;

    private _willSelect: string;

    private _newRow: Row;

    constructor(data: any[] = [], columnSettings: Column[] = []) {
        this._willSelect = '';
        this._columns = columnSettings;
        this._data = data;

        this._rows = [];
    }

    get data(): any[] {
        return this._data;
    }

    set data(val: any[]) {
        this._data = val;

        if (val) {
            this.createRows();
        }
    }

    get columns(): Column[] {
        return this._columns;
    }

    set columns(columns: Column[]) {
        this._columns = [];

        for (const id in columns) {
            if (columns.hasOwnProperty(id)) {
                this._columns.push(new Column(id, columns[id]));
            }
        }
    }

    get rows(): Row[] {
        return this._rows;
    }

    set rows(val: Row[]) {
        this._rows = val;
    }

    get selectedRow(): Row {
        return this._selectedRow;
    }

    set selectedRow(row: Row) {
        this._selectedRow = row;
    }

    get willSelect(): string {
        return this._willSelect;
    }

    set willSelect(val: string) {
        this._willSelect = val;
    }

    get newRow(): Row {
        return this._newRow;
    }

    set newRow(val: Row) {
        this._newRow = val;
    }

    getFirstRow(): Row {
        return this._rows[0];
    }

    getLastRow(): Row {
        return this._rows[this.rows.length - 1];
    }

    getColumnById(id: string) {
        return this.columns.find((val) => val.id === id);
    }

    findRowByData(data: any): Row {
        return this._rows.find((row: Row) => row.data === data);
    }

    deselectAll() {
        this._rows.forEach((row: Row) => {
            row.isSelected = false;
        });
    }

    selectRow(row: Row): Row {
        const previousIsSelected = row.isSelected;
        this.deselectAll();

        row.isSelected = !previousIsSelected;
        this._selectedRow = row;

        return this._selectedRow;
    }

    multipleSelectRow(row: Row): Row {
        row.isSelected = !row.isSelected;
        this._selectedRow = row;

        return this._selectedRow;
    }

    selectPreviousRow(): Row {
        if (this._rows.length > 0) {
            let index = this._selectedRow ? this._selectedRow.index : 0;
            if (index > this._rows.length - 1) {
                index = this._rows.length - 1;
            }

            this.selectRow(this._rows[index]);

            return this._selectedRow;
        }
    }

    selectFirstRow(): Row {
        if (this._rows.length > 0) {
            this.selectRow(this._rows[0]);

            return this._selectedRow;
        }
    }

    selectLastRow(): Row {
        if (this._rows.length > 0) {
            this.selectRow(this.rows[this._rows.length - 1]);

            return this._selectedRow;
        }
    }

    willSelectFirstRow() {
        this._willSelect = 'first';
    }

    willSelectLastRow() {
        this._willSelect = 'last';
    }

    select(): Row {
        if (this._rows.length === 0) {
            return;
        }

        if (this._willSelect) {
            if (this._willSelect === 'first') {
                this.selectFirstRow();
            }

            if (this._willSelect === 'last') {
                this.selectLastRow();
            }

            this._willSelect = '';
        } 
        // else {
        //     this.selectFirstRow();
        // }

        return this._selectedRow;
    }

    createNewRow() {
        this._newRow = new Row(-1, {}, this);
        this._newRow.isInEditing = true;
    }

    /**
     * Create rows based on current data prepared in data source
     */
    private createRows() {
        let idx: number;
        if (this._rows.length > 0) {
            idx = this._rows.findIndex((row: Row) => row.isInEditing === true);
        }

        this._rows = [];

        this._data.forEach((el, index) => {
            const row = new Row(index, el, this);

            if (idx === index) {
                row.isInEditing = true;
            }

            this._rows.push(row);
        });
    }
}
