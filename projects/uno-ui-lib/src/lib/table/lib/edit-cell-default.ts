import { Output, EventEmitter, Input, Directive } from '@angular/core';

import { Cell } from './data-set/cell';

@Directive()
export class EditCellDefault {

    @Input() cell: Cell;
    @Input() inputClass = '';
    @Input() updateColumnList: any;

    @Output() edited = new EventEmitter<any>();
    @Output() selectedElem = new EventEmitter<any>();

    onEdited(event: any): boolean {
        this.edited.next(event);
        return false;
    }

    onStopEditing(): boolean {
        this.cell.row.isInEditing = false;
        return false;
    }

    onClick(event: any) {
        event.stopPropagation();
    }

    getEditorType(): string {
        return this.cell.column.editor && this.cell.column.editor.type;
    }
}
