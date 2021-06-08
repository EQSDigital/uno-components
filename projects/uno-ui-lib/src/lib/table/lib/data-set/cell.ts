import { Column } from './column';
import { DataSet } from './data-set';
import { Row } from './row';

export class Cell {

    private _newValue: any = '';
    /* protected static PREPARE = (value: any) => value; // => will thrown an error on compiling library!
    Check @ https://github.com/ng-packagr/ng-packagr/issues/696 */
    protected static PREPARE(value: any): Function {
        return value;
    }

    constructor(public value: any, public row: Row, public column: Column, public dataSet: DataSet) {
        this._newValue = value;
    }

    get newValue(): any {
        return this._newValue;
    }

    set newValue(value: any) {
        this._newValue = value;
    }

    getValue(): any {
        const valid = this.column.getValuePrepareFunction() instanceof Function;
        const prepare = valid ? this.column.getValuePrepareFunction() : Cell.PREPARE;

        return prepare.call(null, this.value, this.row.data, this);
    }
}
