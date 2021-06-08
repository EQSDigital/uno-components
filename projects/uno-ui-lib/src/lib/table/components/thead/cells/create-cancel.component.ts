import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { Grid } from '../../../lib/grid';
import { DefaultCreateSaveCancel } from '../../../lib/create-save-cancel-default';

@Component({
    selector: 'ng2-st-actions',
    template: `
        <div class="form-creator-submit" [formGroup]="editingFormGroup">
            <button type="submit"
                class="slds-m-right--x-small uno-smart-table-action uno-smart-table-action-add-create text-uppercase"
                unoButton
                unoType="green"
                unoSize="x-small"
                (click)="$event.preventDefault(); create.emit($event)"
                [disabled]="!editingFormGroup.valid"
                [title]="createButtonContent | translate"

                uno-popover-trigger
                [unoPopover]="formErrorsTemplate"
                [unoPopoverOpen]="openValidatorPopover"

                unoPopoverPlacement="leftBottom"
                unoPopoverNubbin="right-top"
                unoPopoverSize="small"
                unoPopoverTooltip="true"
                [unoPopoverTheme]="grid.getSetting('popoverTheme') || 'info'">
                    {{ createButtonContent | translate }}
            </button>

            <uno-icon
                icon="close"
                size="xx-small"
                class="uno-smart-table-action uno-smart-table-action-add-cancel"
                [title]="cancelButtonContent | translate"
                (click)="onCancel($event)">
            </uno-icon>
        </div>

        <!-- The "editingFormGroup" ALL Controller's Input Validator errors: -->
        <ng-template #formErrorsTemplate>
            <div class="form-errors-content-container">
                <!--Following errors where found on editing:-->
                <div *ngFor="let cell of grid.dataSet.columns" class="slds-m-top--x-small">
                    <div *ngIf="editingFormGroup.get(cell.id)?.errors">
                        <b style="color:red;">{{ cell.id }}</b> is invalid!
                        <div *ngFor="let errors of errorsData">
                            <div *ngIf="errors.input === cell.id">
                                <div *ngFor="let strError of errors.translated">
                                    {{ strError }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ng-template>
    `
})
export class THeadCreateCancelComponent extends DefaultCreateSaveCancel implements OnChanges {

    @Input() grid: Grid;
    @Input() cancelCreate: EventEmitter<any>;

    @Output() create = new EventEmitter<any>();

    createButtonContent: string;
    cancelButtonContent: string;

    constructor() {
        super();
    }

    ngOnChanges() {
        // ===========================================
        // Call DefaultCreateSaveCancel "ngOnChanges()" life cycle hook.
        // ===========================================
        super.ngOnChanges();

        this.createButtonContent = this.grid.getSetting('add.createButtonContent');
        this.cancelButtonContent = this.grid.getSetting('add.cancelButtonContent');
    }

    onCancel(evt: any) {
        evt.preventDefault();
        this.grid.createFormShown = false;
        this.cancelCreate.emit();
    }
}
