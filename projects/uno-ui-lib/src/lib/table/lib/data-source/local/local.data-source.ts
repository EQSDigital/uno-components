import { LocalSorter } from './local.sorter';
import { LocalFilter } from './local.filter';
import { DataSource } from '../data-source';
import { deepExtend } from '../../helpers';

interface FilterObj {
    field: string;
    search: string[];
}

export class LocalDataSource extends DataSource {
    private _data: Array<any> = [];
    private _filteredAndSorted: Array<any> = [];
    private _sortConf: Array<any> = [];
    private _filterConf = new Array<FilterObj>();

    constructor(data: Array<any> = []) {
        super();

        this.load(data);
    }

    load(data: Array<any>): Promise<any> {
        this._data = data;

        return super.load(data);
    }

    /**
     * Add a element on first position of the array.
     *
     * @param element - The element to show on table.
     */
    prepend(element: any): Promise<any> {
        this.resetSortAndFilter(true);

        this._data.unshift(element);
        return super.prepend(element);
    }

    /**
     * Add a element on last position of the array.
     *
     * @param element - The element to show on table.
     */
    append(element: any): Promise<any> {
        this.resetSortAndFilter(true);

        this._data.push(element);
        return super.append(element);
    }

    add(element: any): Promise<any> {
        this._data.push(element);

        return super.add(element);
    }

    remove(element: any): Promise<any> {
        this._data = this._data.filter(el => el !== element);

        return super.remove(element);
    }

    update(element: any, values: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.find(element).then((found) => {
                found = deepExtend(found, values);
                super.update(found, values).then(resolve).catch(reject);
            }).catch(reject);
        });
    }

    find(element: any): Promise<any> {
        const found = this._data.find(el => el === element);
        if (found) {
            return Promise.resolve(found);
        }

        return Promise.reject(new Error('Element was not found in the dataset'));
    }

    getElements(): Promise<any> {
        const data = this._data.slice(0);
        return Promise.resolve(this.prepareData(data));
    }

    getFilteredAndSorted(): Promise<any> {
        const data = this._data.slice(0);
        this.prepareData(data);
        return Promise.resolve(this._filteredAndSorted);
    }

    getAll(): Promise<any> {
        const data = this._data.slice(0);
        return Promise.resolve(data);
    }

     /**
     * This method set the sort and filters array on initial state.
     *
     * @param silent - If true dispatch a action of filter.
     */
    resetSortAndFilter(silent = false) {
        this.setFilter([], !silent);
        this.setSort([], !silent);
    }

    /**
     * This method set the sort array on initial state.
     *
     * @param silent - If true dispatch a action of filter.
     */
    resetSort(silent = false) {
        this.setSort([], !silent);
    }

    /**
     * This method set the filters array on initial state.
     *
     * @param silent - If true dispatch a action of filter.
     */
    resetFilter(silent = false) {
        this.setFilter([], !silent);
    }

    empty(): Promise<any> {
        this._data = [];

        return super.empty();
    }

    count(): number {
        return this._filteredAndSorted.length;
    }

    /**
     *
     * Array of conf objects
     * [
     *  {field: string, direction: asc|desc|null, compare: Function|null},
     * ]
     * @param conf
     * @param doEmit
     */
    setSort(conf: Array<any>, doEmit = true): LocalDataSource {
        if (conf !== null) {

            conf.forEach((fieldConf) => {
                if (!fieldConf['field'] || typeof fieldConf['direction'] === 'undefined') {
                    throw new Error('Sort configuration object is not valid');
                }
            });
            this._sortConf = conf;
        }

        super.setSort(conf, doEmit);
        return this;
    }

    /**
     *
     * Array of conf objects
     * [{ field: string, search: string, filter: Function|null },]
     *
     * @param conf
     * @param doEmit
     */
    setFilter(conf: Array<FilterObj>, doEmit = true): LocalDataSource {
        if (conf && conf.length > 0) {
            conf.forEach((val: FilterObj) => this.addFilter(val, false));
        } else {
            this._filterConf = [];
        }

        super.setFilter(conf, doEmit);
        return this;
    }

    addFilter(fieldConf: FilterObj, doEmit: boolean = true): LocalDataSource {
        if (!fieldConf.field || typeof fieldConf.search === 'undefined') {
            throw new Error('Filter configuration object is not valid');
        }

        let found = false;
        this._filterConf.forEach((currentFieldConf: FilterObj, index: number) => {
            if (currentFieldConf.field === fieldConf.field) {
                this._filterConf[index] = fieldConf;
                found = true;
            }
        });

        if (!found) {
            this._filterConf.push(fieldConf);
        }

        super.addFilter(fieldConf, doEmit);
        return this;
    }

    removeFilter(field: string, doEmit: boolean = true) {
        const idx = this._filterConf.findIndex((obj: FilterObj) => obj.field === field);

        if (idx > -1) {
            this._filterConf.splice(idx, 1);
        }

        super.addFilter(this._filterConf, doEmit);
    }

    getSort(): any {
        return this._sortConf;
    }

    getFilter(): FilterObj[] {
        return this._filterConf;
    }

    protected prepareData(data: Array<any>): Array<any> {
        // data = this.filter(data);
        // data = this.sort(data);
        this._filteredAndSorted = data.slice(0);

        return data;
    }

    protected sort(data: Array<any>): Array<any> {
        if (this._sortConf) {
            this._sortConf.forEach((fieldConf) => {
                data = LocalSorter
                    .sort(data, fieldConf['field'], fieldConf['direction'], fieldConf['compare']);
            });
        }

        return data;
    }

    // TODO: refactor?
    protected filter(data: Array<any>): Array<any> {
        if (this._filterConf) {
            let mergedData: any = [];
            this._filterConf.forEach((fieldConf: any) => {
                if (fieldConf['search'].length > 0) {
                    mergedData = mergedData.concat(LocalFilter
                        .filter(data, fieldConf['field'], fieldConf['search'], fieldConf['filter']));
                }
            });
            // remove non unique items
            data = mergedData.filter((elem: any, pos: any, arr: any) => {
                return arr.indexOf(elem) === pos;
            });
        }

        return data;
    }
}
