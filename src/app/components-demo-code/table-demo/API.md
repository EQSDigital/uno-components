### \<uno-smart-table\>

## [Documentation](https://akveo.github.io/ng2-smart-table/#/)
#### UnoSmartTable

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| [settings] | Has all the configuration needs of `<uno-smart-table />` component - described below. | any | |
| [source] | Grid's DATA of `<uno-smart-table />`. | LocalDataSource | |
| [userSettings] | The settings that user and back-office define for that column. | {{ ColumnName: {...}}} | |
| [updateColumnList] | Update the list of the dropbox when it's dependes from other column value. | { ColumnName: [{...}]} | |
| [columnFilters] | Receive the filter values of that column. | { ColumnName: string[]} | |
| (rowSelect) | Triggered once a row is selected (either clicked or selected automatically - after page is changed, after some row is deleted, etc). | EventEmitter\<{data: Object - selected row data object, source: DataSource - current table's data source }\> | |
| (userRowSelect) | Triggered ONLY on a user click event. | EventEmitter\<{ data: Object - selected row data object, source: DataSource - current table's data source }\> | |
| (internalAction) | Triggered everytime `<uno-smart-table />` is doing some internal action (on refresh, any CRUD operation, sort, paginate, etc.). It's the opportunity, at the installation side, to trigger any (external) side effect, coping with current `<uno-smart-table />` internal affair. | EventEmitter\<{ action: string, elements: Array - the current grid (each column) row data collection of Objects, filter: { andOperator: boolen, filters: [ { field: string, search: string, filter: undefined \| function } ] } - current active (columns) filtering, sort: [ { field: string, direction: 'asc' \| 'desc', compare: undefined \| function } ] }\> | |
| (create) | Triggered once CREATE form is opened - a NEW row is about to be created. Mind you that CREATE or EDIT form are the SAME, unique, Angular Reactive Form - with different data. | EventEmitter\<{ source: DataSource - current table's data source }\> | |
| (createSave) | Triggered every time a new row is being CREATED at the table's grid, WITHOUT confirmation `Promise`. | EventEmitter\<{ newRow: [ { any } ] - has each new row cell's value, introduced by the user - if we have a table with 6 columns, will be an Array from 0-5. }\> | |
| (createConfirm) | Triggered every time a new row is GOING to be CREATED, or not, at the table's grid, WITH a `Promise` confirmation. | EventEmitter\<{ confirm: [ { promise: ZoneAwarePromise, reject: function, resolve: function } ] - Promise to be "rejected" or "resolved" by the user (with some modal, alert, form, etc.), data: Object: data, newData?: Object: data, source: DataSource }\>, string: 'create' \| 'delete' \| 'edit'` | |
| (edit) | Triggered once EDIT form is opened - an (updated?) existent row is about to be saved. Mind you that CREATE or EDIT form are the SAME, unique, Angular Reactive Form - with different data. | EventEmitter\<{ cells: [{ column: Object: Column, dataSet: { columnSettings: Object,  columns: [ { Object: Column } ], data: [ {Object: data} ], newRow: Object: Row, rows: [ { Object: Row } ], selectedRow: Object: Row}: DataSet, newValue: any, row: Object : Row, value: any }: Cell ], data: Object: data, index: number - the grid row's index (-1 if it's a new - to create - one), isInEditing: boolean, isSelected: boolean }\> | |
| (selectedElem) | Triggered once user selects/picks a new item from an `<uno-picklist />` editor type. | EventEmitter\<{ cells: [ { Object: Cell } ], data: Object: data, index: number - the grid row's index (-1 if it's a new - to create - one), isInEditing: boolean, isSelected: boolean, selector: string - identifies the selected "uno-picklist" cell editor, by its belonging column name }\> | |
| (editSave) | Triggered every time a new row is being SAVED at the table's grid, WITHOUT confirmation `Promise`. | EventEmitter\<{ newData: { Object: data }, data: { Object: data }}\> | |
| (editConfirm) |  Triggered every time a new row is GOING to be SAVED, or not, at the table's grid, WITH a `Promise` confirmation. | EventEmitter\<{ confirm: [ { promise: ZoneAwarePromise, reject: function, resolve: function } ] - Promise to be "rejected" or "resolved" by the user (with some modal, alert, form, etc.), data: Object: data, newData?: Object: data, source: DataSource }\>, string: 'create' \| 'delete' \| 'edit'` | |
| (deleteConfirm) | Triggered every time a new row is GOING to be DELETED, or not, at the table's grid, WITH a `Promise` confirmation. | EventEmitter\<{ confirm: [ { promise: ZoneAwarePromise, reject: function, resolve: function } ] - Promise to be "rejected" or "resolved" by the user (with some modal, alert, form, etc.), data: Object: data, newData?: Object: data, source: DataSource }\>, string: 'create' \| 'delete' \| 'edit'` | |
| (rowActionCustomEvent) | Besides the CRUD typical row action events (edit, delete, create, etc.) you can customize some Action icons @ row level - on Click, they will trigger this event, perfectly (who triggered) identified. | EventEmitter\<{ action: string - identifies the icon/action click token by the user, data: Object: data - passes the clicked row icon current DATA, source: DataSource, title: string - some second string identifier of the (row) Action - several Action icons can be accomplished for each, or some, row(s). }\> | |
| (rowActionDownloadCustomEvent) | Specific for Nano app installation, identifies, on a specific designed Template icon/trigger, the events emited INSIDE the Download Template Popover. | EventEmitter\<{ fileExtension: string, fileName: string, fromIcon: string, fromTemplate: string = 'downloadContent', modifiedDate: Date, row: data, source: DataSource }\> | |
| (searchTerm) | ONLY triggered when the user made a search. | EventEmitter\<string\> | |
| (formChanges) | ONLY triggered when the user change form values. | EventEmitter\<any\> | |
| (cancelCreate) | ONLY triggered when the user click on cancel create. | EventEmitter\<any\> | |
| (cancelEdit) | ONLY triggered when the user click on cancel edit. | EventEmitter\<any\> | |

### Configuration Object - [settings] Input:

* `hideHeader`: `boolean = false` Set to true to not display the table column titles.
* `noDataMessage`: `string` Customize string when no Data exists to be displayed.
* `hoveringRow`: `Object = { css: 'box-shadow: 0 1px 3px var(--sapphire)' | 'outline: 1px solid var(--sapphire)' }` Contains the CSS property of a possible border over hovering row.
* `attr`: `{ id: string, class: string }` Allows you to set HTML attributes to the `<uno-smart-table />` ('id' and 'class').
* `filter`: `{ inputClass: string }` Common class atributed to all container's Input filter top row.
* `rowPopoverErrors` : `boolean = false` Stating if all form's Input errors (independently of each have its own, or not) are collected at a single Popover, next to submit ("update" | "create") trigger. By default, NO Popover errors will show.
* `popoverTheme`: `string = 'info'` Default is 'info', if "rowPopoverErrors: true". But you can pass here allowed themes for `<uno-popover />` component - 'default' | 'success' | 'warning' | 'info' | 'error' | 'offline' | 'inverse-text' | 'shade' | 'inverse' | 'alt-inverse' = 'default'.
* `actions` : `{
    position: string = 'left' | 'right' (default) | 'none',
    columnTitle: string = 'Actions' - Actions column title,
    add: boolean = true,
    edit: boolean = true,
    editRowProperty: string, // The name of property that control the edit icon to that row (ex: all rows are editable, but one row cannot be editable)
    delete: boolean = true,
    deleteRowProperty: string, // The name of property that control the delete icon to that row (ex: all rows can be deleted, but one row cannot be delete)
    custom: [ { name: string, title: string, icon: string, color?: string, rowProperty?: string } ]
}`
Sets the ROW Action icons.
For Nano app, "download" icon/template popover is driven by row data content @ `source` Input Directive (column(s)).
For "custom" actions (many can be defined!), `rowProperty`, optional, the name of the property that rows where the icon/trigger is supposed to be enabled - if in ALL rows, don't pass the parameter.
* `add`: `{
    inputClass: string,
    addButtonContent: string - customize "Add New" button content/title,
    createButtonContent: string,
    cancelButtonContent: string,
    confirmCreate: false - specifies if this CRUD Action has a "Promiss" confirmation, validated at instalation.
}`
* `edit`: `{
    inputClass: string,
    editButtonContent: string - customize "Edit" button content/title,
    saveButtonContent: string,
    cancelButtonContent: string,
    confirmSave: false - specifies if this CRUD Action has a "Promiss" confirmation, validated at instalation.
}`
* `delete`: `{
    deleteButtonContent: string  - customize "Delete" button content/title,
    confirmDelete: false - specifies if this CRUD Action has a "Promiss" confirmation, validated at instalation.
}`
* `rowClassFunction`: `function` Manipulate different CSS classes for each row in the table.
* `showSearch`: `boolean = false` If show the search bar or not.
* `filterType`: `'single' | 'multiple' = single` the way the filter is applied. If 'single' can only be filtered column by column. Case 'multiple' you can filter for several columns at same time.
* ==============================================================================================================================
* `columns`: `UnoSmartTableColumn` Table column settings - by default an empty object (i.e columns: { columnKey: { title: 'Some Title' } }).
* `title`: `string` Column title.
* `class`: `string` Column class.
* `width`: `string` Column width (i.e. '20px', '5%').
* `defaultValue`: `string | Object` Defines an init value to be displayed once EDITing or CREATEing form is opened/triggered. As we can pass a function to render/edit/create a cell (i.e. "valuePrepareFunction: (value) => value.Name"), this can also be an Object
* `valuePrepareFunction`: `function` Function to run against a value before it gets inserted into a cell (i.e. when the string you want to show it's the 'name' property of an Object lying at grid's cell: `valuePrepareFunction: (value) => value.name`).
This function will be invoked with 2 parameters: cell, row.
* `type`: `string = 'text' (default) | 'html' | 'custom'` If type is text then cell value will be inserted as text. If type is html then cell value will be inserted as html. If type is custom the `renderComponent` property MUST be defined.
* `renderComponent`: `Component Class Name` Custom component that will be responsible for rendering the cell content while in view mode - remember `type` must be `custom` in order for this to work.
* `onComponentInitFunction`: `function` Handy and versatil function which will be invoked AFTER `renderComponent` instantiation and BEFORE ngOnInit() hook, allowing you to full manipulate the cell/column to show. This function gets `renderComponent` instance in first param.
* `sort`: `boolean = true` Whether it's a column that can sort the table by.
* `sortDirection`: `'asc'|'desc'` Sort table by this column with this direction by default - if "sort" = true.
Note: multiple sort option is not supported yet, so "sortDirection" can be applied to only one column per table.
* `editable`: `boolean = true` Whether this column is editable or not. It is, by default.
* `editor`: `{
    type: string: 'text' (default) | 'inputNumber' | 'textarea' | 'lookup' | 'selector' | 'checkbox' | 'custom',
    component?: Component Class Name - mandatory if type is 'custom',
    config: Object - mandatory for 'inputNumber', 'lookup' and 'selector' editor types, and optional for 'checkbox' type,
    isEditableUntil?: Column Name Dependency - Disables the field until the dependency have value.
    validators: { required?: boolean, min?: number, max?: number, minLength?: number, maxLength?: number, pattern?: string } - 'custom' validators still to be done...,
    validatorMsgs: { required?: string, email?: string, minLength?: string, maxLength?: string, min?: string, max?: string },
    popoverErrors: boolean - indicates if this Input has a proper form Validator Popover, independentely of the existence of a single Popover, next to submit ("update" | "create") trigger.,
    inputPopoverTheme: string - default is 'info', if this cell/column "popoverErrors: true". But you can pass here allowed themes for "uno-popover" component - 'default' | 'success' | 'warning' | 'info' | 'error' | 'offline' | 'inverse-text' | 'shade' | 'inverse' | 'alt-inverse' = 'default'.
}`
Sets each cell/column editor properties - the same for cell EDITing or CREATEing.
If `type` is `inputNumber`, config Object is `config: { numberStep: number, inputNumberHasNoValidation: boolean, any: any }`.
If `type` is `lookup`, config Object is `lookupConfig: { urlAPI: string | data: Array, searchField: string, any: any }`.
If `type` is `selector`, config Object is `list: [ { value: string, title?: string, any: any } ]`. For `selector` whit dependencies pass `list: []`.
If `type` is `checkbox`, config Object is `{ true: string, false: string }` converting the boolean true/false to whatever `value` pretended to see on cell/column render. If ommited, 'true'/'false' (strings) will be rendered.
It `type` is `custom`, a Component Class MUST be set at `component` editor property!
On `validatorMsgs` the passed string can have fields to be full filled - form processing will replace them in render time:
@ `email` var `[value field]` can be passed along the string.
@ `minLength` var `[minlength field]` can be passed along the string.
@ `maxlength` vars `[maxlength field]`, `[value field]` and `[current length field]` can be passed along the string.
* `filter`: `boolean` If column can be filtered or not.
* `lineClamp?`: `boolean = true` Whether it's a column that can clamp line in two. In `custom` columns like dropbox it's need desable the line clamp because don't show the list.


### DataSource Methods - ways to reach and CRUD table grid's data

* `load(data)`: `data: Array` Data to load into the table - allows you to reload some fresh new data, i.e., received by the server uppon some triggering.
* `refresh()` Refresh data in the data source. In most cases you DO NOT need to use this method - internally, grid auto refreshes whenever some changes have happened.
* `reset(silent)`: `silent: boolean = false` Set data source to first page with empty filter and empty sort. If "silent" = true, you have to additionally call `refresh()` to reflect the changes at the table's grid!
* `empty()` Empty the data source.
* `count()` Return count of element currently in data source, pagination and filtering independently.
* `find(element)`: `element: Object: data` Find the element/row in the table.
* `getElements()` Get elements listed according to current sort, filter and page.
* `getFilteredAndSorted()` Get elements listed according to current sort and filter - ignore pagination!
* `getAll()` Get all data source elements.
* `prepend(element)`: `element: Object: data` Add a new element/row to the beginning of the table.
* `append(element)`: `element: Object: data` Add a new element/row to the end of the table - it will also trigger a new pagination to the last page.
* `add(element)`: `element: Object: data` Add a new element/row to the table.
* `remove(element)`: `element: Object: data` Remove the element/row from the table.
* `update(element, valuesObj)`: `element: Object: data, valuesObj: Object: data` Update the element/row with "valuesObj".
* `setSort(
    conf: [ { field: string, direction: string, compare: function | null } ],
    doEmit: boolean = true
)`: `conf: Array of sort setting Objects where you can pass a custom compare function, doEmit: emit event to refresh() the table, or not`
Example: this.source.setSort([{ field: 'id', direction: 'asc' }]);
* `setFilter(
    conf: [ { field: string, search: string, filter: function | null } ],
    andOperator: boolean = true,
    doEmit: boolean = true
)`: `conf: Array of filter setting Objects where you can pass a custom filter function, andOperator: how to process multiple filters (as AND - default - or as OR), doEmit: emit event to refresh() the table, or not`
Example: this.source.setFilter( [ { field: 'bars', search: 'foobar' }, { field: 'size', search: '10' } ] );
* `addFilter(
    conf: { field: string, search: string, filter: function | null },
    andOperator: boolean = true,
    doEmit: boolean = true
)`: `conf: single filter setting Object where you can pass a custom filter function, andOperator: how to process multiple filters (as AND - default - or as OR), doEmit: emit event to refresh() the table, or not`
Example: this.source.addFilter( { field: 'bars', search: 'foobar' } );
* `Example to work with very common load() and getAll() DataSource (@ 'dataUnoSmartTable' var) Methods`:
`this.serverData$.subscribe(
    (data) => this.dataUnoSmartTable.load(data).then(
() => this.dataUnoSmartTable.getAll().then(
    (elements) => console.log('... and LOADED @ dataUnoSmartTable:', elements)
)))`
* `You can try and see if a certain field/column data is to be found - will return true/false: `
`this.tableData.find(rowWithSelectorName.data)`
* `.. and update an internal row, manually: `
`this.tableData.update(rowWithSelectorName.data, Object.assign(
    {},
    rowWithSelectorName.data,
    {
    frequency: editingNameObj['PFDLOPAFormule'],
    name: editingNameObj,
    description: editingNameObj['Description']
    }
    )
);`