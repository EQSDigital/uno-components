import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { EditCellDefault } from '../../../lib/edit-cell-default';
import { InputEditorComponent } from '../cell-editors/input-editor.component';
import { SwitchEditorComponent } from '../cell-editors/switch-editor.component';
import { LookupEditorComponent } from '../cell-editors/lookup-editor.component';
import { CheckboxEditorComponent } from '../cell-editors/checkbox-editor.component';
import { TextareaEditorComponent } from '../cell-editors/textarea-editor.component';
import { SelectEditorComponent } from '../cell-editors/select-editor.component';
import { InputNumberEditorComponent } from '../cell-editors/input-number-editor.component';


@Component({
    selector: 'table-cell-default-editor',
    template: `
@switch (getEditorType()) {
  @case ('inputNumber') {
    <input-number-editor
      [editingFormGroup]="editingFormGroup"
      [cell]="cell"
      (onClick)="onClick($event)"
      (onEdited)="onEdited($event)"
      (onStopEditing)="onStopEditing()">
    </input-number-editor>
  }
  @case ('selector') {
    <select-editor
      [editingFormGroup]="editingFormGroup"
      [cell]="cell"
      [updateColumnList]="updateColumnList"
      (selectedElem)="selectedElem.emit($event)"
      (onClick)="onClick($event)"
      (onEdited)="onEdited($event)"
      (onStopEditing)="onStopEditing()">
    </select-editor>
  }
  @case ('textarea') {
    <textarea-editor
      [editingFormGroup]="editingFormGroup"
      [cell]="cell"
      (onClick)="onClick($event)"
      (onEdited)="onEdited($event)"
      (onStopEditing)="onStopEditing()">
    </textarea-editor>
  }
  @case ('checkbox') {
    <checkbox-editor
      [editingFormGroup]="editingFormGroup"
      [cell]="cell"
      (onClick)="onClick($event)">
    </checkbox-editor>
  }
  @case ('lookup') {
    <lookup-editor
      [editingFormGroup]="editingFormGroup"
      [cell]="cell">
    </lookup-editor>
  }
  @case ('switch') {
    <switch-editor
      [editingFormGroup]="editingFormGroup"
      [cell]="cell">
    </switch-editor>
  }
  <!-- If none match, at least a simple Input box is offered: -->
  @default {
    <input-editor
      [editingFormGroup]="editingFormGroup"
      [cell]="cell"
      (onClick)="onClick($event)"
      (onEdited)="onEdited($event)"
      (onStopEditing)="onStopEditing()">
    </input-editor>
  }
}
`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [InputNumberEditorComponent, SelectEditorComponent, TextareaEditorComponent, CheckboxEditorComponent, LookupEditorComponent, SwitchEditorComponent, InputEditorComponent]
})
export class DefaultEditComponent extends EditCellDefault {

    // Pass down to the form (editing) Inputs the Table's "editingForm":
    @Input() editingFormGroup: UntypedFormGroup;

    constructor() {
        super();
    }
}
