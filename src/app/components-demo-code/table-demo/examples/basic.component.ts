import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { TableComponent, ActionCustom, UnoSmartTableSettings, LocalSorter, LocalDataSource } from 'uno-ui-lib';

// Components that will implemnet customized Cell Editor and Render, for delared fields @ "columns":
import { EditorLinkComponent } from '../editor-cell-link';
import { RenderUsernameComponent } from '../render-cell-username';
import { RenderPickColumnComponent } from '../render-pick-cell';

import { EMAIL_REGEX } from 'projects/uno-ui-lib/src/utils/util';

// Check @ https://stackoverflow.com/a/48123576
declare var require: any;

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent implements AfterViewInit {
    // dataTable = new LocalDataSource();
    dataTable: LocalDataSource;

    roles = [];

    settings: UnoSmartTableSettings;

    columnFilters: any;

    showAdd = true;

    @ViewChild(TableComponent, { static: true }) private table: TableComponent;

    constructor() {
        this.dataTable = new LocalDataSource(require('../table-data/data.json'));
        this.settings = this.createTableSettings();
    }

    public ngAfterViewInit() {
        console.log(this.table);
    }

    onAddInlineOutsideTable() {
        console.log('click')
        this.table.createRowNew();
    }

    // ==========================================
    // Event "internalAction" was fired by some user Action, inside <uno-smart-table />,
    // ==========================================
    gridAffairAction(evt: any) {
        console.error('Table DEMO GRID\'s (some) Action: ' + evt.action.toUpperCase(), evt);

        if (evt.action === 'sort') {
            this.dataTable.load(LocalSorter.sort(evt.elements, evt.sort[0].field, evt.sort[0].direction, evt.sort[0].compare));
        }
    }

    // ==========================================
    // OUTPUT <uno-smart-table /> EVENTS:
    // ==========================================
    isInCreating(evt) {
        console.log('A NEW row is about to be CREATEd, using current grid\'s SOURCE data:', evt);
        this.roles = [
            { id: 1, value: 'Admin' },
            { id: 2, value: 'Guest' },
            { id: 3, value: 'Read Only' },
        ];

        this.settings = this.createTableSettings();
    }

    isInEditing(evt) {
        console.log('This row just entered on EDITING mode:', evt);
    }

    onSelectedElem(evt) {
        console.log('This element has been selected: ', evt);
    }

    createSaveEvent(evt) {
        console.warn('A NEW row has been CREATED, without confirmation dialog:', evt);
    }

    rowActionEditSaveEvent(evt) {
        console.warn('An EDITED row has been SAVED, without confirmation dialog:', evt);
    }

    confirmRowActionEvent(evt, strType) {
        const deferredPromise = evt.confirm, origRow = Object.assign({}, evt.data);

        console.log(evt, strType);
        if (window.confirm('Are you sure you want to ' + strType + '?')) {
            switch (strType) {
                case 'edit':
                    console.warn('Original row: ', origRow, 'Modified to: ', evt.newData);
                    break;
                case 'delete':
                    console.warn('Deleted row: ', origRow);
                    break;
                case 'create':
                    console.warn('Created row: ', evt.newData);
                    break;
                default:
                    break;
            }
            deferredPromise.resolve(evt.newData);
        } else {
            deferredPromise.reject();
        }
    }

    rowActionCustomEvent(evt) {
        window.alert(
            'Some "custom" row Action event was triggered\ninside <uno-smart-table /> ("' + evt.action + '")\n\n' +
            JSON.stringify(
                { title: evt.title, data: evt.data }
            )
                .replace(new RegExp('{', 'g'), '{\n')
                .replace(new RegExp(',"', 'g'), ',\n"')
                .replace(new RegExp('}', 'g'), '\n}')
        );
    }

    rowHeaderActionCustomEvent(evt: ActionCustom) {
        console.warn('Some "custom" row header action was triggered inside <uno-smart-table />', evt);
    }

    rowSelectActionCustomEvent(evt: ActionCustom) {
        console.log(evt);
    }

    rowActionDownloadCustomEvent(evt) {
        console.log(
            'Click @ smart-table-lib\'s tbody > cells > custom > template "' + evt.fromTemplate + '" > icon "' + evt.fromIcon + '":',
            evt
        );
    }
    // ==========================================

    onSearchTerm(term: string) {
        console.log(`Search term: ${term}`);
        this.dataTable.addFilter({ field: 'name', search: [term] });
    }

    onSaveOptions(obj: any) {
        console.log('Save options: ', obj);
    }

    onGetColumnFilters(column: string) {
        const obj = {};
        this.dataTable.getElements().then((val) => {
            obj[column] = val.map((elem) => elem[column]);
            this.columnFilters = obj;
        });
    }

    onClickShowPlusButton() {
        this.showAdd = !this.showAdd;
        this.settings = this.createTableSettings();
    }

    private createTableSettings(): UnoSmartTableSettings {
        return {
            selectMode: 'multi',
            filterType: 'single',
            showSearch: true,
            showSaveColumns: true,
            headerActions: [
                {
                    icon: 'logout',
                    visible: true,
                    title: 'logout'
                },
                {
                    icon: 'mail',
                    visible: true,
                    title: 'mail'
                },
                {
                    icon: 'clone',
                    visible: true,
                    title: 'eu sou um nome muito grande!!!!!!!!'
                },
                {
                    icon: 'share',
                    visible: false,
                    title: 'share'
                }
            ],
            selectActions: [
                {
                    icon: 'clone',
                    visible: true,
                    title: 'clone'
                },
                {
                    icon: 'trash',
                    visible: true,
                    title: 'delete'
                }
            ],
            actions: {
                add: this.showAdd,
                edit: true,
                delete: true,
                // => "download" is driven by row data content @ 'table-data/data.json'
                custom: [
                    {
                        name: 'testSomeRows',
                        title: 'Popup @ 2, 4, 5 and 7 ROWS!',
                        icon: 'notification',
                        color: 'green-menu',
                        visible: true
                    },
                    {
                        name: 'testAllRows',
                        title: 'Simple install customization in ALL rows!',
                        icon: 'notifications',
                        visible: true
                    }
                ]
            },

            delete: { confirmDelete: true },

            hoveringRow: { css: 'outline: 1px solid var(--sapphire)' }, // outline: 1px solid var(--sapphire)

            rowPopoverErrors: true,

            hideHeader: false,

            attr: {
                class: 'uno-smart-table',
            },

            // ================================================================================
            // Table cell's DATA related:
            // ================================================================================
            columns: {
                // ....................................................................
                id: {
                    title: 'ID',
                    editable: false,
                    sort: false,
                    filter: false,
                },
                // ....................................................................
                name: {
                    title: 'Full Name',
                    class: 'text-red',
                    editor: {
                        type: 'lookup',
                        config: {
                            lookupConfig: {
                                urlAPI: '//api.github.com/search/users',
                                searchField: 'login'
                            },
                        },
                        validators: {
                            required: true,
                            // , minLength: 20
                            maxLength: 17
                            // NOT YET DONE! :(
                            // , pattern: '[^ @]*@[^ @]*'
                            // , custom: 'emailDomainValidator'
                        },
                        validatorMsgs: {
                            required: 'Este input (name) é OBRIGATÓRIO!'
                        },
                        popoverErrors: true
                    },
                    filter: true
                },
                description: {
                    title: 'Description',

                    editor: {
                        type: 'textarea',
                        validators: {
                            required: false
                        },
                        validatorMsgs: {
                            required: 'Este input (name) é OBRIGATÓRIO!'
                        },
                        popoverErrors: true
                    }
                },
                // ....................................................................
                username: {
                    title: 'User Name',
                    type: 'custom',
                    renderComponent: RenderUsernameComponent,
                    // Next will be invoked AFTER "renderComponent" instantiated and BEFORE ngOnInit() hook.
                    // This function MUST have 'renderComponent' instance as the first (might be unique or not) param.
                    onComponentInitFunction: (customClass: RenderUsernameComponent) => {
                        customClass.valuePrefix = ' > ';
                        customClass.isUpperCase = true;
                    },

                    editor: {
                        type: 'selector',
                        config: {
                            list: [
                                { id: 1, value: 'UserName1', title: 'my uncle!' },
                                { id: 2, value: 'UserName2' },
                                { id: 3, value: 'My Nick Name', title: 'this is mine...' }
                            ]
                        },
                        validators: {
                            required: true,
                            maxLength: 9
                        },
                        validatorMsgs: {
                            required: '"username" es una entrada REQUERIDA!',
                            maxLength: 'Tem [current length field] de comprimento e só pode ter [maxlength field] ([value field])'
                        },
                        popoverErrors: true,
                        inputPopoverTheme: 'warning'
                    }
                },
                // ....................................................................
                email: {
                    title: 'Email',

                    filter: true,
                    editor: {
                        validators: {
                            required: true,
                            pattern: EMAIL_REGEX.source
                        },
                        validatorMsgs: {
                            email: 'Olha chico: este email «[value field]» é inválido',
                            minLength: 'Mestre: bota, pelo menos, [minlength field] caracteres!'
                        },
                        popoverErrors: true,
                        inputPopoverTheme: 'error'
                    }
                },
                // ....................................................................
                link: {
                    title: 'Link',
                    type: 'html',
                    editable: true,

                    editor: {
                        type: 'custom',
                        component: EditorLinkComponent,
                        popoverErrors: true // => won't do nothing since this Input's "editor" has no ": validators{}" defined
                    }
                },
                // ....................................................................
                passed: {
                    title: 'Passed',
                    editable: true,

                    editor: {
                        type: 'checkbox',
                        config: {
                            true: 'Yes, off course',        // If omitted, ONLY boolean "true" will be considered/used.
                            false: 'No',                    // If omitted, ONLY boolean "false" will be considered/used.
                        },
                    },
                    filter: true
                },
                role: {
                    title: 'Role',
                    editable: true,
                    type: 'custom',
                    lineClamp: false,
                    renderComponent: RenderPickColumnComponent,
                    editor: {
                        type: 'selector',
                        config: {
                            list: this.roles
                        }
                    }
                },
            }
        };
    }
}