import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { TableComponent, LocalDataSource, UnoSmartTableSettings, LocalSorter, UnoTableModule } from 'uno-ui-lib';

// Check @ https://stackoverflow.com/a/48123576
declare var require: any;

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [UnoTableModule]
})

export class BasicComponent implements AfterViewInit {
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

    // ==========================================
    // Event "internalAction" was fired by some user Action, inside <uno-smart-table />,
    // ==========================================
    gridAffairAction(evt: any) {
        console.error('Table DEMO GRID\'s (some) Action: ' + evt.action.toUpperCase(), evt);

        if (evt.action === 'sort') {
            this.dataTable.load(LocalSorter.sort(evt.elements, evt.sort[0].field, evt.sort[0].direction, evt.sort[0].compare));
        }
    }

    onSelectedElem(evt) {
        var user = require('../table-data/data.json').find((val: any) => val.id === evt.selectorData.id);
        this.table.form.controls.email.setValue(user.email);
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

    public rowActionCustomEvent(evt: any) {
        switch (evt.action) {
            case 'edit':
                window.alert(evt.data);
                break;
        }
    }

    onSearchTerm(term: string) {
        console.log(`Search term: ${term}`);
        this.dataTable.addFilter({ field: 'name', search: [term] });
    }

    onClickShowPlusButton() {
        this.showAdd = !this.showAdd;
        this.settings = this.createTableSettings();
    }

    private createTableSettings(): UnoSmartTableSettings {
        return {
            showSearch: true,
            actions: {
                add: true,
                delete: true,
                custom: [
                    {
                        name: 'edit',
                        title: 'edit',
                        icon: 'edit',
                        visible: true
                    }
                ]
            },

            delete: { confirmDelete: true },

            hoveringRow: { css: 'outline: 1px solid var(--light-primary)' }, // outline: 1px solid var(--light-primary)

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
                    editor: {
                        type: 'selector',
                        config: {
                            list: require('../table-data/data.json').map((val: any) => ({ id: val.id, value: val.name }))
                        },
                        validators: {
                            required: true
                        }
                    },
                    filter: true
                },
                // ....................................................................
                email: {
                    title: 'Email',

                    filter: true,
                    editable: false
                },
                description: {
                    title: 'Description',

                    editable: false
                }
            }
        };
    }
}