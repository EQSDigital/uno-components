// The table configuration params:
export interface UnoSmartTableSettings {
    /**
     * Determines how to react on action links (Add, Edit, Delete).
     * 'external' - just trigger the events (LINK HERE).
     * 'inline' - process internally, show forms/inputs/etc
     * 'click-to-edit' - TRY TO UNDERSTAND WHAT THIS DO. MADE BY PEDRO.
     */
    mode?: 'inline' | 'external' | 'click-to-edit';

    /**
     * Determines if show checkbox or not.
     * 'single' - No represent checkbox on left side.
     * 'multi' - Represent checkbox on the left side.
     */
    selectMode?: 'single' | 'multi';

    /**
     * Determines if the row has color on its left side
     */
    colorRow?: boolean;

    /**
     * Set to true to not display the table column titles.
     */
    hideHeader?: boolean;

    /**
     * Message shown when there is no data in the table.
     */
    noDataMessage?: string;

    hoveringRow?: {
        css: string
    };

    /**
     * Determines the collapsible properties of the table.
     */
    tableCollapsible?: {
        /**
         * Determines if table is collapsible or not.
         * By default is false.
         */
        isCollapsible: boolean,

        /**
         * Determines the icon to be show when row is close.
         */
        iconClose: string,

        /**
         * Determines the icon to be show when row is open.
         */
        iconOpen: string
    };

    /**
     * Table's common HTML attributes.
     */
    attr?: {
        id?: string;
        class?: string;
    };

    filter?: {
        inputClass?: string  // Common class atributed to all container's Input filter row.
    };

    /**
     * Determines if all errors will go for a single popover over submit button.
     * By default, no popover error will show.
     */
    rowPopoverErrors?: boolean;

    /**
     * Determines the popover theme.
     * Default is 'info', if "rowPopoverErrors: true".
     * 'default' | 'success' | 'warning' | 'info' | 'error' | 'offline' | 'inverse-text' | 'shade' | 'inverse' | 'alt-inverse' = 'default'
     */
    popoverTheme?: string;

    /**
     * Determines the actions of the header.
     */
    headerActions?: ActionCustom[];

    /**
     * Determines the actions of the table.
     */
    actions?: {
        /**
         * Determines the position of the action.
         * 'right' - Thes last column is the actions.
         * 'none' - No actions appear.
         */
        position?: 'right'| 'none';

        /**
         * Determines the title of the column actions.
         */
        columnTitle?: string;

        /**
         * Determines if actions have add action.
         */
        add?: boolean;

        /**
         * Determines if actions have edit action.
         */
        edit?: boolean;

        /**
         * Determines if that row can be edited
         */
        editRowProperty?: string;

        /**
         * Determines if actions have delete action.
         */
        delete?: boolean;

        /**
         * Determines if that row can be deleted
         */
        deleteRowProperty?: string;

        /**
         * Can be define other actions per/all row(s)!
         */
        custom?: RowActionCustom[];
    };

    add?: {
        inputClass?: string;
        addButtonContent?: string
        createButtonContent?: string;
        cancelButtonContent?: string;
        confirmCreate?: boolean;
    };

    edit?: {
        inputClass?: string;
        editButtonContent?: string;
        saveButtonContent?: string;
        cancelButtonContent?: string;
        confirmSave?: boolean;
    };

    delete?: {
        deleteButtonContent?: string;
        confirmDelete?: boolean;
    };

    rowClassFunction?: Function;

    showSearch?: boolean;

    /**
     * The table's columns - only at instalation, we know the name of each column (key, to the interface Type)!.
     */
    columns: { [key: string]: UnoSmartTableColumn };

    filterType?: 'single' | 'multiple'; // Indicates if the filter is column by column or multiple columns.
}

export interface ActionCustom {
    icon: string;
    visible: boolean;
    title: string;
}

export interface RowActionCustom extends ActionCustom {
    name: string;
    color?: string;
    rowProperty?: string;
}


// The table's columns params:
export interface UnoSmartTableColumn {
    title?: string;
    class?: string;                     // HTML class @ this Header's field/column <th> tag
    width?: string;                     // '_px' | '_%'
    defaultValue?: string | Object;     // Defines an init value to be displayed once EDITing or CREATEing form is opened/triggered.
                                        // As we can pass a function to render/edit/create a cell
                                        // (i.e. "valuePrepareFunction: (value) => value.Name"), this can also be an Object

    valuePrepareFunction?: Function;
    isVisible?: boolean;

    type?: 'text' | 'html' | 'custom' | 'switch';
    lineClamp?: boolean;
    // For type: 'custom':
    renderComponent?: any; // Refering to a dynamic angular component class, as a type, is not possible @ TypeScript
    renderComponentExpanded?: any;
    onComponentInitFunction?: Function;

    sort?: boolean;
    sortDirection?: 'asc' | 'desc';

    editable?: boolean;
    editor?: ColumnEditor;

    filter?: boolean;    // If column can be filter or not.
}

export interface ColumnEditor {
    type?: 'text' | 'inputNumber' | 'textarea' | 'lookup' | 'selector' | 'checkbox' | 'custom' | 'switch';
    // A component Class Name is mandatory IF type is 'custom':
    component?: any;            // Refering to a dynamic angular component class, as a type, is not possible @ TypeScript
    onComponentInitFunctionExpanded?: Function;
    config?: Object;            // Mandatory for 'inputNumber', lookup' and 'selector' editor types, and optional for 'checkbox' type
    isEditableUntil?: string;

    validators?: {
        required?: boolean;
        min?: number;
        max?: number;
        minLength?: number;
        maxLength?: number;
        pattern?: string
    };

    validatorMsgs?: {
        required?: string;
        email?: string;
        minLength?: string;
        maxLength?: string;
        min?: string;
        max?: string;
    };

    popoverErrors?: boolean;     // Indicates if this Input has a proper form Validator Popover, independentely of the existence
                                // of a single Popover, next to submit ("update" | "create") trigger.
    inputPopoverTheme?: string;  // Default is 'info', if this cell/column "popoverErrors: true".
    // But you can pass here allowed themes for "uno-popover" component -
    // 'default' | 'success' | 'warning' | 'info' | 'error' | 'offline' | 'inverse-text' | 'shade' | 'inverse' | 'alt-inverse' = 'default';
}
