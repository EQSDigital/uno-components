import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { Grid } from '../../../lib/grid';
import { DefaultCreateSaveCancel } from '../../../lib/create-save-cancel-default';
import { TranslatePipe } from '@ngx-translate/core';

import { IconComponent } from '../../../../icon/icon.component';
import { PopoverTriggerDirective } from '../../../../popover/popover.component';
import { ButtonDirective } from '../../../../button/button.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'ng2-st-actions',
    template: `
        <div class="form-creator-submit" [formGroup]="editingFormGroup">
          <button type="submit"
            class="slds-m-right--x-small uno-smart-table-action uno-smart-table-action-add-create text-uppercase"
            unoButton
            unoType="green"
            unoSize="small"
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
        
          <uno-icon icon="close"
            size="small"
            class="uno-smart-table-action uno-smart-table-action-add-cancel"
            [title]="cancelButtonContent | translate"
            (click)="onCancel($event)">
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
                    @for (errors of errorsData; track errors) {
                      <div>
                        @if (errors.input === cell.id) {
                          <div>
                            @for (strError of errors.translated; track strError) {
                              <div>
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
    imports: [FormsModule, ReactiveFormsModule, ButtonDirective, PopoverTriggerDirective, IconComponent, TranslatePipe]
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
