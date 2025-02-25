import { Component } from '@angular/core';

import { LocalDataSource, UnoSmartTableSettings, UnoTableModule, ModalComponent, IconComponent, ButtonDirective } from 'uno-ui-lib';

import { RenderDuskBadgeColumnComponent } from '../badge.renderDuskBadgeColumn';
import { RenderCommentsColumnComponent } from '../comments.renderCommentsColumn';
import { RenderControlLevelColumnComponent } from '../controlLevel.renderControlLevelColumn';
import { RenderLikelihoodColumnComponent } from '../likelihood.renderLikelihoodColumn';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';


@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [UnoTableModule, ModalComponent, IconComponent, ButtonDirective, TranslateDirective, TranslatePipe]
})

export class BasicComponent {
    public dataIdentified = [
        {
            hazardType: { id: 1, siteId: 1, name: 'Type 1' },
            hazard: { id: 1, siteId: 1, name: 'Hazard 1' },
            riskFactor: { id: 1, siteId: 1, name: 'Risk 1' },
            chemicalProducts: 1,
            safeguards: 2,
            ppe: 3,
            injuryTypes: 4,
            comment: 'hbgyf frtdersxhfgcj',
            docs: 6
        },
        {
            hazardType: { id: 2, siteId: 1, name: 'Type 2' },
            hazard: { id: 2, siteId: 1, name: 'Hazard 2' },
            riskFactor: { id: 2, siteId: 1, name: 'Risk 2' },
            chemicalProducts: 2,
            safeguards: 3,
            ppe: 4,
            injuryTypes: 5,
            comment: 'hjgfhgv vttrdhrtd',
            docs: 7
        }
    ];

    // public dataEvaluated = [
    //     {
    //         hazard: { id: 1, siteId: 1, name: 'Hazard 1' },
    //         dl: { id: 1, siteId: 1, name: 'DL 1' },
    //         el: { id: 1, siteId: 1, name: 'EL 1' },
    //         likelihood: { id: 1, siteId: 1, name: 'Hight', value: 13.5344234 },
    //         sl: { id: 1, siteId: 1, name: 'SL 1' },
    //         controlLevel: { id: 1, siteId: 1, name: 'IV', color: 'red', description: 'Está tudo mal' }
    //     },
    //     {
    //         hazard: { id: 2, siteId: 1, name: 'Hazard 2' },
    //         dl: { id: 1, siteId: 1, name: 'DL 2' },
    //         el: { id: 1, siteId: 1, name: 'EL e' },
    //         likelihood: { id: 1, siteId: 1, name: 'Low', value: 97.79835263 },
    //         sl: { id: 1, siteId: 1, name: 'SL 2' },
    //         controlLevel: { id: 1, siteId: 1, name: 'V', color: 'green', description: 'Está tudo bem' }
    //     }
    // ];

    public dataEvaluated = [
        {
            hazard: { id: 1, siteId: 1, name: 'Hazard 1' },
            dl: { id: 1, siteId: 1, name: 'DL 1' },
            el: { id: 1, siteId: 1, name: 'EL 1' },
            likelihood: { id: 1, siteId: 1, name: 'Hight', value: 13.5344234 },
            sl: { id: 1, siteId: 1, name: 'SL 1' },
            controlLevel: { id: 1, siteId: 1, name: 'IV', color: 'red', description: 'Está tudo mal' }
        },
        {
            hazard: { id: 2, siteId: 1, name: 'Hazard 2' },
            dl: null,
            el: null,
            likelihood: null,
            sl: null,
            controlLevel: null
        }
    ];

    public dataModal = [
        {
            id: 1,
            siteId: 1,
            name: 'Object 1',
            isSelected: false
        },
        {
            id: 2,
            siteId: 1,
            name: 'Object 2',
            isSelected: false
        },
        {
            id: 3,
            siteId: 1,
            name: 'Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3 Object 3',
            isSelected: false
        },
        {
            id: 4,
            siteId: 1,
            name: 'Object 4',
            isSelected: false
        }
    ];

    tableData = new LocalDataSource();
    tableSettings = {} as UnoSmartTableSettings;

    public openModalChemical = false;

    badgeChemical: RenderDuskBadgeColumnComponent;

    constructor() {
        this.onClickIdentified();
    }

    onFormChanges(formValues: any) {
        // console.log(formValues)
    }

    onCancel() {
        console.log('cancel');
    }

    gridAffairAction(evt) {
        if (['sort'].indexOf(evt.action) !== -1) {
            // this.useNanoAPIGetData(evt);
        }
    }


    confirmRowActionEvent(evt: any, strType: string) {
        const deferredPromise = evt.confirm;
        const origRow = Object.assign({}, evt.data);

        switch (strType) {
            case 'edit':
                console.warn('A row has been EDITED and MODIFIED; Original row: ', origRow, 'Modified to: ', evt.newData);
                deferredPromise.resolve(evt.newData);
                break;
            case 'delete':
                console.warn('A row has been DELETED: ', origRow);
                deferredPromise.resolve(evt.newData);
                break;
            case 'create':
                deferredPromise.resolve(evt.newData);
                break;
            default:
                deferredPromise.reject();
        }
    }

    onClickIdentified() {
        this.tableSettings = this.createUnoSmartTableIdentified();
        this.tableData.load(this.dataIdentified);
    }

    onClickEvaluated() {
        this.tableSettings = this.createUnoSmartTableEvaluated();
        this.tableData.load(this.dataEvaluated);
    }

    public onSaveChemicals() {
        // this.table.grid.getNewRow().cells[3].newValue = 3;
        // console.log(this.table.grid.getNewRow())
        this.badgeChemical.value = 3;
        this.badgeChemical.cdRef.detectChanges();
    }

    // ======================================
    // CONFIG parameters for <uno-smart-table />
    // ======================================
    private createUnoSmartTableIdentified(): UnoSmartTableSettings {
        return {
            showSearch: true,

            // Table attributes:
            attr: {
                id: 'risk-template-identified-table',
                class: 'uno-smart-table',
            },
            // Table custom aspects:
            hoveringRow: { css: 'outline: 1px solid var(--light-primary)' },

            // The columns:
            columns: {
                hazardType: {
                    title: 'hazardType',
                    valuePrepareFunction: (value: any) => value ? value.name : null,
                    filter: false,
                    editor: {
                        type: 'selector',
                        validators: {
                            required: true
                        },
                        config: {
                            list: [{ id: 1, value: 'Type 1' }, { id: 2, value: 'Type 2' }]
                        }
                    }
                },
                hazard: {
                    title: 'hazard',
                    valuePrepareFunction: (value: any) => value ? value.name : null,
                    editor: {
                        type: 'selector',
                        validators: {
                            required: true
                        },
                        config: {
                            list: [{ id: 1, value: 'Hazard 1' }, { id: 2, value: 'Hazard 2' }]
                        },
                        isEditableUntil: 'hazardType'
                    },
                    filter: false
                },
                riskFactor: {
                    title: 'riskFactor',
                    valuePrepareFunction: (value: any) => value ? value.name : null,
                    filter: false,
                    editor: {
                        type: 'selector',
                        validators: {
                            required: true
                        },
                        config: {
                            list: [{ id: 1, value: 'Risk 1' }, { id: 2, value: 'Risk 2' }]
                        },
                        isEditableUntil: 'hazard'
                    }
                },
                chemicalProducts: {
                    title: 'chemicalProducts',
                    type: 'custom',
                    renderComponent: RenderDuskBadgeColumnComponent,
                    onComponentInitFunction: (customClass: RenderDuskBadgeColumnComponent) => {
                        customClass.isClick = true;
                        customClass.badgeClick.subscribe(() => this.openModalChemical = true);
                    },
                    filter: false,
                    editor: {
                        type: 'custom',
                        component: RenderDuskBadgeColumnComponent,
                        onComponentInitFunctionExpanded: (customClass: RenderDuskBadgeColumnComponent) => {
                            this.badgeChemical = customClass;
                            customClass.isClick = true;
                            customClass.badgeClick.subscribe(() => this.openModalChemical = true);
                        }
                    }
                },
                safeguards: {
                    title: 'safeguards',
                    type: 'custom',
                    renderComponent: RenderDuskBadgeColumnComponent,
                    onComponentInitFunction: (customClass: RenderDuskBadgeColumnComponent) => {
                        customClass.isClick = true;
                    },
                    filter: false,
                    editor: {
                        type: 'custom',
                        component: RenderDuskBadgeColumnComponent,
                        onComponentInitFunctionExpanded: (customClass: RenderDuskBadgeColumnComponent) => {
                            customClass.isClick = true;
                        }
                    }
                },
                ppe: {
                    title: 'ppe',
                    type: 'custom',
                    renderComponent: RenderDuskBadgeColumnComponent,
                    onComponentInitFunction: (customClass: RenderDuskBadgeColumnComponent) => {
                        customClass.isClick = true;
                    },
                    filter: false,
                    editor: {
                        type: 'custom',
                        component: RenderDuskBadgeColumnComponent,
                        onComponentInitFunctionExpanded: (customClass: RenderDuskBadgeColumnComponent) => {
                            customClass.isClick = true;
                        }
                    }
                },
                injuryTypes: {
                    title: 'injuryTypes',
                    type: 'custom',
                    renderComponent: RenderDuskBadgeColumnComponent,
                    onComponentInitFunction: (customClass: RenderDuskBadgeColumnComponent) => {
                        customClass.isClick = true;
                    },
                    filter: false,
                    editor: {
                        type: 'custom',
                        component: RenderDuskBadgeColumnComponent,
                        onComponentInitFunctionExpanded: (customClass: RenderDuskBadgeColumnComponent) => {
                            customClass.isClick = true;
                        }
                    }
                },
                comment: {
                    title: 'comment',
                    type: 'custom',
                    renderComponent: RenderCommentsColumnComponent,
                    filter: false,
                    editor: {
                        type: 'custom',
                        component: RenderCommentsColumnComponent
                    }
                }
            },
            actions: {
                add: true,
                edit: true,
                delete: true
            },
            // As we have to do some Obj transformation BEFORE finalize CRUD actions
            // all of them will be returned as Promisses:
            add: { confirmCreate: true, addButtonContent: 'addNew' },
            edit: { confirmSave: true },
            delete: { confirmDelete: true }
        };
    }

    private createUnoSmartTableEvaluated(): UnoSmartTableSettings {
        return {
            showSearch: true,

            // Table attributes:
            attr: {
                id: 'risk-template-evaluated-table',
                class: 'uno-smart-table',
            },
            // Table custom aspects:
            hoveringRow: { css: 'outline: 1px solid var(--light-primary)' },

            // The columns:
            columns: {
                hazard: {
                    title: 'hazard',
                    valuePrepareFunction: (value: any) => value ? value.name : null,
                    editable: false,
                    filter: false
                },
                dl: {
                    title: 'dl',
                    valuePrepareFunction: (value: any) => value ? value.name : null,
                    filter: false,
                    editor: {
                        type: 'selector',
                        validators: {
                            required: true
                        },
                        config: {
                            list: [{ id: 1, value: 'DL 1' }, { id: 2, value: 'DL 2' }]
                        },
                        isEditableUntil: 'hazard'
                    }
                },
                el: {
                    title: 'el',
                    valuePrepareFunction: (value: any) => value ? value.name : null,
                    filter: false,
                    editor: {
                        type: 'selector',
                        validators: {
                            required: true
                        },
                        config: {
                            list: [{ id: 1, value: 'EL 1' }, { id: 2, value: 'EL 2' }]
                        },
                        isEditableUntil: 'dl'
                    }
                },
                likelihood: {
                    title: 'likelihood',
                    type: 'custom',
                    renderComponent: RenderLikelihoodColumnComponent,
                    filter: false,
                    editable: false
                },
                sl: {
                    title: 'sl',
                    valuePrepareFunction: (value: any) => value ? value.name : null,
                    filter: false,
                    editor: {
                        type: 'selector',
                        validators: {
                            required: true
                        },
                        config: {
                            list: [{ id: 1, value: 'SL 1' }, { id: 2, value: 'SL 2' }]
                        },
                        isEditableUntil: 'likelihood'
                    }
                },
                controlLevel: {
                    title: 'controlLevel',
                    type: 'custom',
                    renderComponent: RenderControlLevelColumnComponent,
                    filter: false,
                    editor: {
                        type: 'custom',
                        component: RenderControlLevelColumnComponent,
                    }
                }
            },
            actions: {
                edit: true,
                delete: true
            },
            edit: { confirmSave: true },
            delete: { confirmDelete: true }
        };
    }
}