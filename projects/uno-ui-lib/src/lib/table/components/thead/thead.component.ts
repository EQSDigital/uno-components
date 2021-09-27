import { Component, Input, Output, EventEmitter, OnChanges, ElementRef, AfterViewInit, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Grid } from '../../lib/grid';
import { ActionCustom } from '../../table.interfaces';

@Component({
    selector: '[ng2-st-thead]',
    templateUrl: './thead.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class Ng2SmartTableTheadComponent implements OnChanges, AfterViewInit {

    // Recieve, here, the Table's "editingForm":
    @Input() editingFormGroup: FormGroup;

    @Input() grid: Grid;

    @Input() createConfirm: EventEmitter<any>;

    @Input() updateColumnList: any;

    @Input() cancelCreate: EventEmitter<any>;

    @Output() sort = new EventEmitter<any>();

    @Output() selectAllRows = new EventEmitter<boolean>();

    @Output() create = new EventEmitter<any>();

    @Output() selectedElem = new EventEmitter<any>();

    @Output() createSave = new EventEmitter<any>();

    @Output() filter = new EventEmitter<any>();

    @Output() getColumnFilters = new EventEmitter<string>();

    @Output() customAction = new EventEmitter<ActionCustom>();

    tableHead: HTMLElement;
    isHideHeader: boolean;

    constructor(
        private elemRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngAfterViewInit() {
        this.tableHead = this.elemRef.nativeElement;

        if (!this.grid.hasColorRow()) {
            const rows: HTMLCollection = this.tableHead.getElementsByTagName('tr');
            for (let i = 0; i < rows.length; i++) {
                const col: HTMLTableDataCellElement = rows.item(i).getElementsByTagName('th')[0];
                this.renderer.setStyle(col, 'padding-left', '1.25rem');
            }
        }
    }

    ngOnChanges() {
        this.isHideHeader = this.grid.getSetting('hideHeader');
    }
}
