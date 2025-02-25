import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { EditCellDefault } from '../../../lib/edit-cell-default';
import { DefaultEditComponent } from './default-edit.component';
import { CustomEditComponent } from './custom-edit.component';


@Component({
    selector: 'table-cell-edit-mode',
    template: `
@switch (getEditorType()) {
  @case ('custom') {
    <table-cell-custom-editor
      [cell]="cell"
      [inputClass]="inputClass"
      [editingFormGroup]="editingFormGroup"
      (edited)="onEdited($event)"
      (selectedElem)="selectedElem.emit($event)">
    </table-cell-custom-editor>
  }
  @default {
    <table-cell-default-editor
      [editingFormGroup]="editingFormGroup"
      [cell]="cell"
      [inputClass]="inputClass"
      [updateColumnList]="updateColumnList"
      (edited)="onEdited($event)"
      (selectedElem)="selectedElem.emit($event)">
    </table-cell-default-editor>
  }
}
`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CustomEditComponent, DefaultEditComponent]
})

export class EditCellComponent extends EditCellDefault {

    // Pass down to the form (editing) Inputs the Table's "editingForm":
    @Input() editingFormGroup: UntypedFormGroup;

    constructor() {
        super();
    }
}
