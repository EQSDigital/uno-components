import { Component } from '@angular/core';

import { DefaultEditorDirective } from '../../../lib/editor-cell-default';

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
            <ng-container *ngFor="let errors of errorsData">
                <ng-container *ngIf="errors.input === cell.column.id">
                    <div *ngFor="let strError of errors.translated">
                        {{ strError }}
                    </div>
                </ng-container>
            </ng-container>
        </ng-template>
    `,
})
export class TextareaEditorComponent extends DefaultEditorDirective {
    constructor() {
        super();
    }
}
