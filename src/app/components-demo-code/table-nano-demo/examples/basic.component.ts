import { Component } from '@angular/core';
import { take, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

// <uno-smart-table /> class to get Data source (just the grid rows data) into it:
import { LocalDataSource, UnoSmartTableSettings } from 'projects/uno-ui-lib/src/lib/table';

// Nano app's API http Services and config:
import { NanoService, RowData, Paging, Filter, ColumnSort } from '../nano-http.service';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    tableData = new LocalDataSource();
    tableSettings = {} as UnoSmartTableSettings;
    userSettings: any;

    // Into the Nano API we must always insert some kimd of paging - you define above the default one
    paging = {} as Paging;
    defaultPaging: Paging = { page: 1, perPage: 10 };
    // Either "Previous" or "Next" to do another service http call to next, or previous, page:
    setPage: string;
    // Memorize last coming filters and sort arrays:
    filters = [] as Filter[];
    sort = [] as ColumnSort[];

    years = [];
    updateColumnList: any;

    openValidatorPopover = false;

    showTable = false;

    showTable$: Observable<any>;

    constructor(private nanoService: NanoService) {
        this.useNanoAPI_getData(this.filters, this.sort, this.defaultPaging);

        this.tableSettings = this.createTableSettings();
        this.userSettings = this.createUserSetings();
    }

    onClickShowTable() {
        this.showTable = !this.showTable;
    }

    // Want a single input search item... ? Instead 1 per column...? Listen for this event:
    onSearch(query = '') {
        if (query === '') {
            // Reset internally grid's current filtering state:
            // this.tableData.setFilter([], false);
            // Reset 'this.filters' URI query:
            this.filters = [];
            // Trigger new Nano's API call, to reset Data grid:
            this.useNanoAPIGetData();
            // Nothing to proceed:
            return false;
        }

        // Specify fields we want to include in the search
        const filterFilters = [
            {
                field: 'title',
                search: query
            },
            {
                field: 'author',
                search: query
            },
            {
                field: 'rating',
                search: query
            },
            {
                field: 'year_published',
                search: query
            }
        ];

        // Set internal filtering:
        // this.tableData.setFilter(
        //     filterFilters,
        //     true  // doEmit: boolean
        // );
        // The fake DB we are using (json-server) doesn't have "OR" filtering
        // => it will always return [] - filtering with "AND" in ALL fields will difficult return something!
        // So... we just trigger internal filtering, on this particular case.

        // // Set API call filtering:
        // this.filters = filterFilters;
        // // Trigger new Nano's API call, with the filtering demands:
        // this.useNanoAPI_getData();
    }

    onFormChanges(formValues: any) {
        // console.log(formValues)
        if (formValues.author) {
            this.years = [
                { id: 1, value: 2017 },
                { id: 2, value: 2018 },
                { id: 3, value: 2019 },
                { id: 4, value: 2020 }
            ];

            this.updateColumnList = { year_published: this.years };
        }
    }

    // Event "internalAction" was fired by the user, inside <uno-samrt-table />,
    gridAffairAction(evt) {
        // console.error('Table DEMO-NANO GRID\'s (some) Action: ' + evt.action.toUpperCase(), evt);

        // What we want to catch here is internal affairs
        // ONLY triggered EXCLUSIVELY by user, such as filter, paging, sort, etc.
        // So:
        // 'load': CAN'T pass - would do an infinite loop @ instalation by injecting new (the same!) data again.
        // 'refresh': MUST pass - used for 1st loading.
        // 'filter', 'sort', 'paging': are the ones! This nano particular case instalation DO NOT pass 'filter' - see "onSearch()" comments
        // 'prepend', 'append', 'remove', etc. are all CRUD operations: catch <thead /> or <tbody /> HTML events
        if (['sort'].indexOf(evt.action) !== -1) {
            this.useNanoAPIGetData(evt);
        }
    }

    navigateTo() {
        this.setPage === 'Previous' ? this.paging.page > 1 ? this.paging.page-- : this.paging.page = 1 : this.paging.page++;
        // Get new set of page:
        this.useNanoAPIGetData();
    }

    // Do this installation Nano http call, with the asked "internalAction"s by the user:
    useNanoAPIGetData(evt = null) {
        const action = evt ? evt.action : null;
        const demandFiltering = action === 'filter' ? true : false;
        const demandSorting = action === 'sort' ? true : false;

        // this.paging = evt.paging;
        // paging is here always done OUTSIDE <uno-smart-table /> internal affairs - we don't care whats coming from UNO smart-table
        this.paging = this.paging.page ? this.paging : this.defaultPaging;
        this.sort = demandSorting ? evt.sort : this.sort;
        this.filters = demandFiltering ? evt.filter.filters : this.filters;
        // Reset to 1st page if any filtering was asked NOW, by the user:
        if (demandFiltering) { this.paging.page = 1; }

        this.useNanoAPI_getData(this.filters, this.sort, this.paging);
    }

    useNanoAPI_getData(filters, sort, paging) {
        this.showTable$ = this.nanoService.getData(filters, sort, paging).pipe(delay(1000));
        this.nanoService.getData(filters, sort, paging)
            .pipe(take(1))
            .subscribe(
                (nanoDataRow: RowData[]) => {
                    // With the recieved set of Data, from Nano app, inject it @ our <uno-smart-table /> grid:
                    this.tableData.load(nanoDataRow);
                }
            );
    }

    // Create a new Row using this installation Nano http call Services
    useNanoAPI_createData(rowObj: RowData) {
        this.nanoService.createData(rowObj)
            .pipe(take(1))
            .subscribe(
                (createdRow: RowData) => console.warn('... and has also been CREATED @ Nano API!', createdRow)
            );

    }

    // Save an updated Row using his installation Nano http call Services
    useNanoAPI_updateData(rowObj) {
        this.nanoService.updateData(rowObj)
            .pipe(take(1))
            .subscribe(
                (updatedRow: RowData) => console.warn('... and has also been UPDATED @ Nano API!', updatedRow)
            );
    }

    // Delete a Row using his installation Nano http call Services
    useNanoAPI_deleteData(rowObj) {
        this.nanoService.deleteData(rowObj)
            .pipe(take(1))
            .subscribe(
                (deletedRow: RowData) => console.warn('... and has also been DELETED @ Nano API!', rowObj)
            );
    }

    // ==========================================
    // OUTPUT <uno-smart-table /> CRUD EVENTS:
    // ==========================================
    createSaveEvent(evt) {
        console.warn('A NEW row has been CREATED, without confirmation dialog:', evt);
        const rowKeys = Object.keys(this.createTableSettings().columns);
        const objRow = {} as RowData;

        rowKeys.forEach((eachKey, idx) => objRow[eachKey] = evt.newRow[idx]);

        // Create it through Nano API:
        this.useNanoAPI_createData(objRow);

    }

    rowActionEditSaveEvent(evt) {
        console.warn('An EDITED row has been SAVED, without confirmation dialog:', evt);
        // Update it through Nano API:
        this.useNanoAPI_updateData(evt.newData);
    }

    confirmRowActionEvent(evt: any, strType: string) {
        const deferredPromise = evt.confirm;
        const origRow = Object.assign({}, evt.data);

        if (window.confirm('Are you sure you want to ' + strType + '?')) {
            switch (strType) {
                case 'add':
                    this.useNanoAPI_createData(evt.newData);
                    break;
                case 'edit':
                    console.warn('A row has been EDITED and MODIFIED; Original row: ', origRow, 'Modified to: ', evt.newData);
                    break;
                case 'delete':
                    console.warn('A row has been DELETED: ', origRow);
                    // Delete it through Nano API:
                    this.useNanoAPI_deleteData(origRow);
                    break;
                case 'create':
                    break;
                default:
                    break;
            }

            deferredPromise.resolve(evt.newData);
        } else {
            deferredPromise.reject();
        }
    }

    private createTableSettings(): UnoSmartTableSettings {
        return {
            showSearch: true,
            hoveringRow: { css: 'outline: 1px solid var(--sapphire)' }, // 'box-shadow: 0 1px 3px var(--sapphire)'
            columns: {
                id: {
                    title: 'ID',
                    // Using single input search item...?
                    filter: false
                },
                title: {
                    title: 'Title',
                    // Using single input search item...?
                    filter: false,
                    editor: {
                        validators: {
                            required: true,
                            minLength: 3,
                            maxLength: 25
                        }
                    }
                },
                author: {
                    title: 'Author',
                    // Using single input search item...?
                    filter: false,
                    editor: {
                        type: 'selector',
                        config: {
                            list: [
                                { id: 1, value: 'UserName1', title: 'my uncle!' },
                                { id: 2, value: 'UserName2' },
                                { id: 3, value: 'My Nick Name', title: 'this is mine...' }
                            ]
                        }
                    }
                },
                rating: {
                    title: 'Rating',
                    // Using single input search item...?
                    filter: false,
                    editor: {
                        type: 'inputNumber',
                        validators: {
                            min: 0,
                            max: 9999
                        },
                        config: {
                            numberStep: 1
                        }
                    }
                },
                year_published: {
                    title: 'Year Published',
                    // Instead of Input text, use an Input number:
                    editor: {
                        // type: 'inputNumber',
                        // config: {
                        //     // Even if you input directly with keyboard (which HTML5 does NOT control!) only numbers > 0 are allowed:
                        //     numberPattern: '\\d+',
                        //     // The HTML5 selector min number:
                        //     numberMin: 1700,
                        //     // The HTML5 selector step increment/decrement:
                        //     numberStep: 50,
                        //     // We have here another Angular's Reactive Form BUG!
                        //     // As we are ALREADY doing (number) validation, state if, for this "inputNumber" type, colorize validation is on
                        // }
                        type: 'selector',
                        config: {
                            list: this.years
                        },
                        isEditableUntil: 'author'
                        // If general, all-columns,
                        // previous parameter has no effect and we SHOULD state, instead, the wanted validators! For instance:,
                        // validators: {
                        //     required: true,
                        //     // minLength: 20,
                        //     // maxLength: 17,
                        //     // NOT YET DONE! :(
                        //     // pattern: '[^ @]*@[^ @]*',
                        //     // custom: 'emailDomainValidator',
                        // }
                    },
                    // Using single input search item...?
                    filter: false
                }
            },
            actions: {
                add: true,
                edit: true,
                delete: true
            },
            add: { confirmCreate: true },
            // edit: { confirmSave: true },
            delete: { confirmDelete: true }
        };
    }

    private createUserSetings() {
        return {
            id: {
                visible: false,
                require: false,
                width: null,
                filter: false,
                sort: true,
            },
            title: {
                visible: true,
                require: true,
                width: null,
                filter: false,
                sort: true,
            },
            author: {
                visible: true,
                require: true,
                width: null,
                filter: false,
                sort: true,
            },
            rating: {
                visible: true,
                require: false,
                width: null,
                filter: false,
                sort: true,
            },
            year_published: {
                visible: true,
                require: false,
                width: null,
                filter: false,
                sort: true,
            }
        };
    }
}