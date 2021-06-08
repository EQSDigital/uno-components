import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';

@Component({
    selector: 'table-cell-view-mode',
    styleUrls: ['../cell-editors/editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container [ngSwitch]="cell.column.type">
            <custom-view-component *ngSwitchCase="'custom'" [cell]="cell" [isExpanded]="isExpanded"></custom-view-component>

            <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue() || '-'" class="uno-smart-table-cell-view view-html line-clamp"></div>

            <uno-switch *ngSwitchCase="'switch'" [checked]="cell.getValue()" [disable]="true"></uno-switch>

            <div
                *ngSwitchDefault
                [title]="cell.getValue() || '-'"
                class="uno-smart-table-cell-view line-clamp"
                [ngClass]="{ 'view-default-expanded': isExpanded }"
                [style.max-width]="cell.column.width || '100%'">
                {{ cell.getValue() || '-' }}
            </div>
        </ng-container>
    `,
})

export class ViewCellComponent {
    @Input() cell: Cell;
    @Input() isExpanded: boolean;
}
