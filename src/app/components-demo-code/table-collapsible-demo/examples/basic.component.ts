import { Component } from '@angular/core';
import { UnoSmartTableSettings, LocalDataSource } from 'uno-ui-lib';

import { RenderBadgeComponent } from '../render-badge';
import { RenderInputTagsComponent } from '../render-input-tags';
import { RenderBadgesComponent } from '../render-badges';

declare var require: any;

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    dataTable = new LocalDataSource();

    allSkills = [
        { id: 1, name: 'Angular' },
        { id: 2, name: 'Css' },
        { id: 3, name: 'Javascript' },
        { id: 4, name: 'HTML' },
        { id: 5, name: 'Ember' },
        { id: 6, name: 'Vue' },
        { id: 7, name: 'React' },
        { id: 8, name: 'Redux' },
        { id: 9, name: 'Rails' },
        { id: 10, name: 'Ruby' },
        { id: 11, name: 'Python' },
        { id: 12, name: 'Python 2' },
        { id: 13, name: 'Python 3' },
        { id: 14, name: 'Python 4' },
        { id: 15, name: 'NodeJS' },
        { id: 16, name: 'Meteor' },
    ];

    settings: UnoSmartTableSettings = {
        selectMode: 'multi',
        colorRow: true,
        tableCollapsible: {
            isCollapsible: true,
            iconOpen: 'down',
            iconClose: 'right'
        },
        actions: {
            add: true,
            edit: true,
            delete: true,
            // => "download" is driven by row data content @ 'table-data/data.json'
            custom: [
                {
                    name: 'testSomeRows',
                    title: 'Popup @ 2, 4, 5 and 7 ROWS!',
                    icon: 'notification',
                    color: 'green-menu',
                    rowProperty: 'isGreate',
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
        add: { confirmCreate: true },
        edit: { confirmSave: true },
        delete: { confirmDelete: true },

        hoveringRow: { css: 'box-shadow: 0 1px 3px var(--light-primary)' }, // outline: 1px solid var(--light-primary)

        rowPopoverErrors: true,

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
                filter: false
            },
            // ....................................................................
            name: {
                title: 'Name',
                editor: {
                    type: 'text',
                    validators: {
                        required: true,
                        minLength: 3,
                        maxLength: 17
                    },
                    validatorMsgs: {
                        required: 'Este input (name) é OBRIGATÓRIO!'
                    },
                    popoverErrors: true
                }
            },
            // ....................................................................
            description: {
                title: 'Description',
                type: 'text',
                editor: {
                    type: 'textarea',
                    validators: {
                        required: true,
                        minLength: 10
                    },
                    validatorMsgs: {
                        required: 'Description es una entrada REQUERIDA!',
                        maxLength: 'Tem [current length field] de comprimento e só pode ter [maxlength field] ([value field])'
                    },
                    popoverErrors: true,
                    inputPopoverTheme: 'warning'
                }
            },
            // ....................................................................
            skills: {
                title: 'Skills',
                type: 'custom',
                width: '200px',
                renderComponent: RenderBadgeComponent,
                onComponentInitFunction: (customClass: RenderBadgeComponent) => {
                    customClass.objectToLength = 'skills';
                },
                renderComponentExpanded: RenderBadgesComponent,
                editable: true,

                editor: {
                    type: 'custom',
                    component: RenderInputTagsComponent,
                    onComponentInitFunctionExpanded: (customClass: RenderInputTagsComponent) => {
                        customClass.skills = this.allSkills;
                    },
                    validators: {
                        required: true
                    }
                }
            },
            // ....................................................................
            isGreate: {
                title: 'Greate',
                type: 'switch',
                editable: true,

                editor: {
                    type: 'switch',
                    validators: {
                        required: true
                    }
                }
            }
        }
    };

    constructor() {
        this.dataTable.load(require('../../table-demo/table-data/collapsed-data.json'));
    }

    onUserRowSelect(evt) {
        // console.log(evt);
    }

    // ==========================================
    // Event "internalAction" was fired by some user Action, inside <uno-smart-table />,
    // ==========================================
    gridAffairAction(evt) {
        // console.error('Table DEMO GRID\'s (some) Action: ' + evt.action.toUpperCase(), evt);
    }

    // ==========================================
    // OUTPUT <uno-smart-table /> EVENTS:
    // ==========================================
    isInCreating(evt) {
        console.log('A NEW row is about to be CREATEd, using current grid\'s SOURCE data:', evt);
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
        const deferredPromise = evt.confirm;
        const origRow = Object.assign({}, evt.data);

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

    rowActionDownloadCustomEvent(evt) {
        console.log(
            'Click @ smart-table-lib\'s tbody > cells > custom > template "' + evt.fromTemplate + '" > icon "' + evt.fromIcon + '":',
            evt
        );
    }
}