import { Component, Input } from '@angular/core';

import { Grid } from '../../../lib/grid';

@Component({
    selector: '[ng2-st-checkbox-select-all]',
    template: `
        <input type="checkbox" [checked]="grid.getSelectedRows().length === this.grid.dataSet.rows.length" [indeterminate]="grid.getSelectedRows().length > 0 && grid.getSelectedRows().length !== grid.dataSet.rows.length">
    `,
})
export class CheckboxSelectAllComponent {
    @Input() grid: Grid;
}
