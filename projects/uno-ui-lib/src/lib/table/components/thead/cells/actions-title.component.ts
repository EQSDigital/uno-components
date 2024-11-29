import { Component, Input, OnChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { cloneDeep } from 'lodash';

import { Grid } from '../../../lib/grid';
import { Column } from '../../../lib/data-set/column';

@Component({
    selector: '[ng2-st-actions-title]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="ng2-smart-title slds-grid slds-grid--align-end">
            <uno-icon icon="column-filter"
                      size="small"
                      [title]="'options' | translate"
                      uno-popover-trigger
                      [unoPopoverOpen]="openPopoverOptions"
                      [unoPopover]="moreOptions"
                      unoPopoverPlacement="bottomLeft"
                      unoPopoverNubbin="top-right"
                      unoPopoverSize="small"
                      (click)="openPopoverOptions = !openPopoverOptions">
            </uno-icon>
            <ng-template #moreOptions>
                <div class="slds-grid slds-wrap">
                    <div class="slds-size--1-of-1 slds-p-around--small open-sans-bold-10 text-uppercase" translate>
                        viewColumns
                    </div>
                    <div *ngFor="let column of grid.dataSet.columns"
                        class="slds-size--1-of-1 slds-p-around--x-small slds-truncate open-sans-10"
                        (click)="onCheckColumn(column)"
                        [style.cursor]="column.isRequired ? 'normal' : 'pointer'">
                        <input type="checkbox" class="slds-align-middle" [checked]="column.isVisibled" [disabled]="column.isRequired">
                        <span class="slds-p-left--x-small slds-align-middle" translate>{{ column.title }}</span>
                    </div>
                    <div *ngIf="showButtonSave"
                        class="slds-size--1-of-1 slds-p-around--x-small nunito-semibold-14">
                        <!--button unoButton unoSize="small" unoType="secondary" (click)="openPopoverOptions = !openPopoverOptions" translate>cancel
                            </button-->
                        <button *ngIf="grid.getSetting('showSaveColumns')"
                                unoButton
                                unoSize="small"
                                unoType="green"
                                class="slds-float--right"
                                (click)="onSave()"
                                translate>
                            save
                        </button>
                    </div>
                </div>
            </ng-template>
        </div>
    `,
})
export class ActionsTitleComponent implements OnChanges {
    @Input() grid: Grid;

    @Output() saveOptions = new EventEmitter<any>();

    /**
     * Variable to control the show/hide button save on popover options.
     */
    showButtonSave = false;

    /**
     * Variable to control the popover with options of the table.
     */
    openPopoverOptions = false;

    private columnsFirstState: Column[];

    ngOnChanges() {
        this.columnsFirstState = cloneDeep(this.grid.dataSet.columns);
    }

    onCheckColumn(column: Column) {
        if (!column.isRequired) {
            column.isVisibled = !column.isVisibled;

            let findDiferences = false;
            this.columnsFirstState.forEach((col: Column) => {
                if (col.isVisibled !== column.isVisibled) {
                    findDiferences = true;
                }
            });

            if (findDiferences) {
                this.showButtonSave = true;
            } else {
                this.showButtonSave = false;
            }
        }
    }

    onSave() {
        const obj = [];

        this.grid.dataSet.columns.forEach((column: Column) => {
            obj.push({
                parameterName: column.id,
                isVisible: column.isVisibled,
                isRequire: column.isRequired,
                isSorted: column.isSortable,
                isFilter: !!column.filter,
                width: column.width
            });
        });

        this.saveOptions.emit(obj);
        this.openPopoverOptions = false;
        this.showButtonSave = false;
    }
}
