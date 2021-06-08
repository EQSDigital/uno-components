export class LocalFilter {

    // protected static FILTER = (value: string, search: string) => { // => will thrown an error on compiling library!
    // Check @ https://github.com/ng-packagr/ng-packagr/issues/696
    protected static FILTER(value: string, search: string) {
        return value.toString().toLowerCase().includes(search.toString().toLowerCase());
    }

    static filter(data: Array<any>, field: string, search: string, customFilter?: Function): Array<any> {
        const filter: Function = customFilter ? customFilter : this.FILTER;

        return data.filter((el) => {
            const value = typeof el[field] === 'undefined' || el[field] === null ? '' : el[field];
            return filter.call(null, value, search);
        });
    }
}
