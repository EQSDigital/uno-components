import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';
import { SwitchComponent } from '../../../../switch/switch.component';
import { CustomViewComponent } from './custom-view.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'table-cell-view-mode',
    styleUrls: ['../cell-editors/editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
@switch (cell.column.type) {
  @case ('custom') {
    <custom-view-component [cell]="cell" [isExpanded]="isExpanded"></custom-view-component>
  }
  @case ('html') {
    <div [innerHTML]="cell.getValue() || '-'" class="uno-smart-table-cell-view view-html line-clamp"></div>
  }
  @case ('switch') {
    <uno-switch [checked]="cell.getValue()" [disable]="true"></uno-switch>
  }
  @default {
    <div
      [title]="cell.getValue() || '-'"
      class="uno-smart-table-cell-view line-clamp"
      [ngClass]="{ 'view-default-expanded': isExpanded }"
      [style.max-width]="cell.column.width || '100%'">
      {{ cell.getValue() || '-' }}
    </div>
  }
}
`,
    standalone: true,
    imports: [
    CustomViewComponent,
    SwitchComponent,
    NgClass
],
})

export class ViewCellComponent {
    @Input() cell: Cell;
    @Input() isExpanded: boolean;
}
