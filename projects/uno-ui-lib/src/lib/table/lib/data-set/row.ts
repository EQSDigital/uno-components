import { Cell } from './cell';
import { Column } from './column';
import { DataSet } from './data-set';

export class Row {
    private _data: any;

    isSelected = false;

    isInEditing = false;

    private _cells: Cell[] = [];

    constructor(
        public index: number,
        data: any,
        protected _dataSet: DataSet
    ) {
        this._data = data;
        this.process();
    }

    get data(): any {
        return this._data;
    }

    set data(data: any) {
        this._data = data;
        this.process();
    }

    get cells() {
        return this._cells;
    }

    set cells(val: Cell[]) {
        this._cells = val;
    }

    getCell(column: Column): Cell {
        return this.cells.find((el: Cell) => el.column === column);
    }

    getIsSelected(): boolean {
        return this.isSelected;
    }

    getNewData(): any {
        const values = Object.assign({}, this.data);
        this._cells.forEach((cell: Cell) => {
            if (values[cell.column.id] instanceof Array) {
                values[cell.column.id] = Object.assign([], cell.newValue);
            } else {
                values[cell.column.id] = cell.newValue;
            }
        });

        return values;
    }

    process() {
        this._cells = [];
        this._dataSet.columns.forEach((column: Column) => {
            const cell = this.createCell(column);
            this._cells.push(cell);
        });
    }

    createCell(column: Column): Cell {
        const defValue = (column as any).settings.defaultValue ? (column as any).settings.defaultValue : '';
        const value = typeof this.data[column.id] === 'undefined' ? defValue : this.data[column.id];

        // It's necessary create a new Array reference for when update the cell value don't update initial value.
        if (Array.isArray(value)) {
            return new Cell(Object.assign([], value), this, column, this._dataSet);
        }

        return new Cell(value, this, column, this._dataSet);
    }
}
