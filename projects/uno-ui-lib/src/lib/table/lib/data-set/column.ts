export class Column {
    title = '';
    type = '';
    class = '';
    width = '';
    isSortable = false;
    isEditable = true;
    isVisibled = true;
    isRequired = false;
    sortDirection = '';
    defaultSortDirection = '';
    filter: boolean;
    renderComponent: any = null;
    renderComponentExpanded: any = null;
    compareFunction: Function;
    valuePrepareFunction: Function;
    onComponentInitFunction: Function;
    lineClamp = true;
    private _filters: any[];
    private _displayedFilters: any[];
    private _editor: {
        type: string,
        config: any,
        component: any,
        onComponentInitFunctionExpanded: Function,
        popoverErrors: boolean,
        inputPopoverTheme: string,
        isEditableUntil: string,
        validators: any
    } = {
            type: '',
            config: {},
            component: null,
            onComponentInitFunctionExpanded: null,
            popoverErrors: false,
            inputPopoverTheme: '',
            isEditableUntil: null,
            validators: {}
        };

    constructor(public id: string, protected settings: any) {
        this._filters = [];
        this.process();
    }

    get editor(): any {
        return this._editor;
    }

    get filters(): any[] {
        return this._filters;
    }

    set filters(val: any[]) {
        this._filters = val.map((elem: string) => ({ name: elem, checked: true }));
        this._displayedFilters = this._filters.slice();
    }

    get displayedFilters(): any[] {
        return this._displayedFilters;
    }

    set displayedFilters(val: any[]) {
        this._displayedFilters = val;
    }

    searchDisplayedFilters(term: string) {
        this._displayedFilters = this._filters.filter((val) => {
            return val.name ? val.name.toLowerCase().includes(term.toLowerCase()) : false;
        });
    }

    selectAllFilters() {
        this._displayedFilters.map((val) => val.checked = true);
    }

    removeAllFilters() {
        this._displayedFilters.map((val) => val.checked = false);
    }

    getOnComponentInitFunction(): Function {
        return this.onComponentInitFunction;
    }

    getOnComponentInitFunctionExpanded(): Function {
        return this._editor.onComponentInitFunctionExpanded;
    }

    getCompareFunction(): Function {
        return this.compareFunction;
    }

    getValuePrepareFunction(): Function {
        return this.valuePrepareFunction;
    }

    getConfig(): any {
        return this._editor && this._editor.config;
    }

    getValidators(): any {
        return this._editor && this._editor.validators;
    }

    protected process() {
        this.title = this.settings['title'];
        this.class = this.settings['class'];
        this.width = this.settings['width'];
        this.type = this.prepareType();
        this._editor = this.settings['editor'];
        this.filter = this.settings['filter'];
        this.renderComponent = this.settings['renderComponent'];
        this.renderComponentExpanded = this.settings['renderComponentExpanded'];

        this.defaultSortDirection = ['asc', 'desc'].indexOf(this.settings['sortDirection']) !== -1 ? this.settings['sortDirection'] : '';
        this.isSortable = typeof this.settings['sort'] === 'undefined' ? true : !!this.settings['sort'];
        this.isEditable = typeof this.settings['editable'] === 'undefined' ? true : !!this.settings['editable'];
        this.isVisibled = typeof this.settings['isVisible'] === 'undefined' ? true : !!this.settings['isVisible'];
        this.isRequired = this.getValidators() ? (this.getValidators().required ? true : false) : false;
        this.sortDirection = this.prepareSortDirection();

        this.compareFunction = this.settings['compareFunction'];
        this.valuePrepareFunction = this.settings['valuePrepareFunction'];
        this.onComponentInitFunction = this.settings['onComponentInitFunction'];
        this.lineClamp = typeof this.settings['lineClamp'] === 'undefined' ? true : !!this.settings['lineClamp'];
    }

    prepareType(): string {
        return this.settings['type'] || this.determineType();
    }

    prepareSortDirection(): string {
        return this.settings['sort'] === 'desc' ? 'desc' : 'asc';
    }

    determineType(): string {
        return 'text';
    }
}
