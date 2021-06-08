export class LocalSorter {

    // protected static COMPARE = (direction: any, a: any, b: any) => { // => will thrown an error on compiling library!
    // Check @ https://github.com/ng-packagr/ng-packagr/issues/696
    protected static COMPARE(direction: any, a: any, b: any) {
        // if (a < b) {
        //     return -1 * direction;
        // }
        // if (a > b) {
        //     return direction;
        // }
        // return 0;
        // Shouldn't be case sensitive and push nulls/empties to the top/end of the ordered list!

        // Converting strings to lowercase
        const first = typeof a === 'string' ? a.toLowerCase() : a;
        const second = typeof b === 'string' ? b.toLowerCase() : b;

        // Empties and nulls:
        if (a === '' || a === null) {
            return direction;
        }

        if (b === '' || b === null) {
            return -1 * direction;
        }

        // Exactly the same? Even being nulls, empties or different case...? Doesn't matter:
        if (first === second) {
            return 0;
        }

        // Normal case:
        return first < second ? -1 * direction : direction;
    }

    static sort(data: Array<any>, field: string, direction: string, customCompare?: Function): Array<any> {

        const dir: number = (direction === 'asc') ? 1 : -1;
        const compare: Function = customCompare ? customCompare : this.COMPARE;

        return data.sort((a, b) => {
            return compare.call(null, dir, a[field], b[field]);
        });
    }
}
