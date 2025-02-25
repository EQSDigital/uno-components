import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';

import { Grid } from '../../../lib/grid';
import { Row } from '../../../lib/data-set/row';
import { DefaultCreateSaveCancel } from '../../../lib/create-save-cancel-default';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

import { IconComponent } from '../../../../icon/icon.component';
import { PopoverTriggerDirective } from '../../../../popover/popover.component';
import { ButtonDirective } from '../../../../button/button.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'ng2-st-tbody-save-cancel',
    template: `
        <div class="form-editor-submit" [formGroup]="editingFormGroup">
          <button type="submit"
            class="slds-m-right--x-small uno-smart-table-action uno-smart-table-action-edit-save text-uppercase"
            unoButton
            unoType="green"
            unoSize="small"
            (click)="onSave($event)"
            [disabled]="!editingFormGroup.valid"
            [title]="saveButtonContent | translate"
        
            uno-popover-trigger
            [unoPopover]="formErrorsTemplate"
            [unoPopoverOpen]="openValidatorPopover"
        
            unoPopoverPlacement="leftBottom"
            unoPopoverNubbin="right-top"
            unoPopoverSize="small"
            unoPopoverTooltip="true"
            [unoPopoverTheme]="grid.getSetting('popoverTheme') || 'info'">
            {{ saveButtonContent | translate }}
          </button>
        
          <uno-icon id="close"
            icon="close"
            size="small"
            class="uno-smart-table-action uno-smart-table-action-edit-cancel"
            [title]="cancelButtonContent | translate"
            (click)="onCancelEdit($event)">
          </uno-icon>
        
        </div>
        
        <!-- The "editingFormGroup" ALL Controller's Input Validator errors: -->
        <ng-template #formErrorsTemplate>
          <div class="form-errors-content-container">
            <!--Following errors where found on editing:-->
            @for (cell of grid.dataSet.columns; track cell) {
              <div class="slds-m-top--x-small">
                @if (editingFormGroup.get(cell.id)?.errors) {
                  <div>
                    <b style="color:red;">{{ cell.id }}</b> is invalid!
                    <!-- Has error {{ editingFormGroup.get(cell.id).errors | json}}! -->
                    @for (errors of errorsData; track errors) {
                      <div>
                        @if (errors.input === cell.id) {
                          <div>
                            @for (strError of errors.translated; track strError) {
                              <div translate>
                                {{ strError }}
                              </div>
                            }
                          </div>
                        }
                      </div>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </ng-template>
        `,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, ButtonDirective, PopoverTriggerDirective, IconComponent, TranslateDirective, TranslatePipe]
})
export class TbodySaveCancelComponent extends DefaultCreateSaveCancel implements OnChanges {

    @Input() grid: Grid;
    @Input() row: Row;
    @Input() editConfirm: EventEmitter<any>;

    @Output() editSave = new EventEmitter<any>();
    @Output() editCancel = new EventEmitter();

    cancelButtonContent: string;
    saveButtonContent: string;

    constructor() {
        super();
    }

    ngOnChanges() {
        // ===========================================
        // Call DefaultCreateSaveCancel "ngOnChanges()" life cycle hook
        // ===========================================
        super.ngOnChanges();

        this.saveButtonContent = this.grid.getSetting('edit.saveButtonContent');
        this.cancelButtonContent = this.grid.getSetting('edit.cancelButtonContent');
    }

    onSave(event: any) {
        event.preventDefault();
        event.stopPropagation();

        if (!this.grid.getSetting('edit.confirmSave')) {
            // As it will be saved immediately, send to the instalation the Edited Data to be, i.e., API call saved @ BD:
            this.editSave.emit(
                {
                    data: Object.assign({}, this.row.data),
                    newData: this.row.getNewData(),
                }
            );

            this.editingFormGroup.reset();
        }
        // Save data @ grid, checking if it needs an "editConfirm" or not:
        this.grid.save(this.row, this.editConfirm);
    }

    onCancelEdit(event: any) {
        event.preventDefault();
        event.stopPropagation();

        this.row.isInEditing = false;
        this.editingFormGroup.reset();

        this.editCancel.emit();
    }
}
