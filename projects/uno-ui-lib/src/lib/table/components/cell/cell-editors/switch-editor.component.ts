import { Component, HostListener, OnInit } from '@angular/core';

import { DefaultEditorDirective } from '../../../lib/editor-cell-default';

@Component({
    selector: 'switch-editor',
    template: `
        <div class="form-cell form-editor-switch">
            <uno-switch [checked]="checked" [disable]="disable"></uno-switch>
        </div>
    `,
    styleUrls: ['./editor.component.scss']
})
export class SwitchEditorComponent extends DefaultEditorDirective implements OnInit {

    checked: boolean;
    disable: boolean;

    @HostListener('click') onToggle() {
        if (this.disable) {
            return;
        }

        this.checked = !this.checked;

        this.cell.newValue = this.checked;
        this.editingFormGroup.controls[this.cell.column.id].setValue(this.checked);
    }

    constructor() {
        super();
    }

    ngOnInit() {
        // If user click on create the cell.getValue() is a instance of string.
        this.checked = (typeof this.cell.getValue() === 'string') ? false : this.cell.getValue();
        this.disable = !this.cell.column.isEditable;

        this.editingFormGroup.controls[this.cell.column.id].setValue(this.checked);
    }
}
