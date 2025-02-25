import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';

import { Grid } from '../../../lib/grid';
import { Row } from '../../../lib/data-set/row';
import { TranslatePipe } from '@ngx-translate/core';
import { IconComponent } from '../../../../icon/icon.component';


@Component({
    selector: 'ng2-st-tbody-edit-delete',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @if (!editRowProperty && isActionEdit) {
          <uno-icon [id]="edit"
            icon="edit"
            size="small"
            class="uno-smart-table-action uno-smart-table-action-edit-edit"
            [title]="editRowButtonContent | translate"
            (click)="onEdit($event)">
          </uno-icon>
        }
        
        @if (row.data[editRowProperty] && isActionEdit) {
          <uno-icon [id]="edit"
            icon="edit"
            size="small"
            class="uno-smart-table-action uno-smart-table-action-edit-edit"
            [title]="editRowButtonContent | translate"
            (click)="onEdit($event)">
          </uno-icon>
        }
        
        @if (!deleteRowProperty && isActionDelete) {
          <uno-icon id="trash"
            icon="trash"
            size="small"
            class="uno-smart-table-action uno-smart-table-action-delete-delete"
            [title]="deleteRowButtonContent | translate"
            (click)="onDelete($event)">
          </uno-icon>
        }
        
        @if (row.data[deleteRowProperty] && isActionDelete) {
          <uno-icon id="trash"
            icon="trash"
            size="small"
            class="uno-smart-table-action uno-smart-table-action-delete-delete"
            [title]="deleteRowButtonContent | translate"
            (click)="onDelete($event)">
          </uno-icon>
        }
        `,
    standalone: true,
    imports: [
    IconComponent,
    TranslatePipe
],
})
export class TbodyEditDeleteComponent implements OnChanges {

    @Input() grid: Grid;

    @Input() row: Row;

    @Input() deleteConfirm: EventEmitter<any>;

    @Output() edit = new EventEmitter<any>();

    @Output() delete = new EventEmitter<any>();

    @Output() editRowSelect = new EventEmitter<any>();

    isActionEdit: boolean;
    isActionDelete: boolean;
    editRowProperty: string;
    deleteRowProperty: string;
    editRowButtonContent: string;
    deleteRowButtonContent: string;

    ngOnChanges() {
        this.isActionEdit = this.grid.getSetting('actions.edit');
        this.isActionDelete = this.grid.getSetting('actions.delete');
        this.editRowProperty = this.grid.getSetting('actions.editRowProperty');
        this.deleteRowProperty = this.grid.getSetting('actions.deleteRowProperty');
        this.editRowButtonContent = this.grid.getSetting('edit.editButtonContent');
        this.deleteRowButtonContent = this.grid.getSetting('delete.deleteButtonContent');
    }

    onEdit(event: any) {
        event.preventDefault();
        event.stopPropagation();

        this.editRowSelect.emit(this.row);

        this.edit.emit({
            data: this.row.data,
            source: this.grid.source,
        });

        this.grid.edit(this.row);
    }

    onDelete(event: any) {
        event.preventDefault();
        event.stopPropagation();

        if (this.grid.getSetting('mode') === 'external') {
            this.delete.emit({
                data: this.row.data,
                source: this.grid.source,
            });
        } else {
            this.grid.delete(this.row, this.deleteConfirm);
        }
    }
}
