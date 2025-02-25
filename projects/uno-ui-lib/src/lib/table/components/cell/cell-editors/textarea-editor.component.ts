import { Component } from '@angular/core';

import { DefaultEditorDirective } from '../../../lib/editor-cell-default';
import { TranslatePipe } from '@ngx-translate/core';

import { PopoverTriggerDirective } from '../../../../popover/popover.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'textarea-editor',
    styleUrls: ['./editor.component.scss'],
    template: `
        <div class="form-cell form-editor-textarea" [formGroup]="editingFormGroup">
          <textarea
            class="form-control slds-input"
            [placeholder]="cell.column.title | translate"
        
            [formControlName]="cell.column.id"
            (input)="cell.newValue = $event.target.value;"
            [name]="cell.column.id"
        
            (click)="onClick.emit($event)"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()"
        
            uno-popover-trigger
            [unoPopover]="formErrorsContent"
            [unoPopoverOpen]="openValidatorPopover"
            unoPopoverSize="small"
            unoPopoverTooltip="true"
            [unoPopoverTheme]="cell.column.editor?.inputPopoverTheme || 'info'">
          </textarea>
        </div>
        
        <!-- This Controller's Input Validator errors: -->
        <ng-template #formErrorsContent>
          @for (errors of errorsData; track errors) {
            @if (errors.input === cell.column.id) {
              @for (strError of errors.translated; track strError) {
                <div>
                  {{ strError }}
                </div>
              }
            }
          }
        </ng-template>
        `,
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    PopoverTriggerDirective,
    TranslatePipe
],
})
export class TextareaEditorComponent extends DefaultEditorDirective {
    constructor() {
        super();
    }
}
