import { Component, Input, ViewChild, ViewContainerRef, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';
import { ViewCell } from '../../../lib/view-cell-interface';
import { NgClass } from '@angular/common';

@Component({
    selector: 'custom-view-component',
    template: `
        <div [ngClass]="{ 'line-clamp': cell.column.lineClamp }">
            <ng-template #dynamicTarget></ng-template>
        </div>
    `,
    styleUrls: ['../cell-editors/editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass]
})
export class CustomViewComponent implements OnInit, OnDestroy {

    customComponent: any;
    @Input() cell: Cell;
    @Input() isExpanded: boolean;

    @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true }) dynamicTarget: ViewContainerRef;

    constructor() { }

    ngOnInit() {
        if (this.cell && !this.customComponent) {
            this.createCustomComponent();
            this.callOnComponentInit();
            this.patchInstance();
        }
    }

    ngOnDestroy() {
        if (this.customComponent) {
            this.customComponent.destroy();
        }
    }

    /**
     * This method render de template defined on table settings for custom template.
     */
    protected createCustomComponent() {
        if (this.isExpanded) {
            this.customComponent = this.dynamicTarget.createComponent(this.cell.column.renderComponentExpanded);
        } else {
            this.customComponent = this.dynamicTarget.createComponent(this.cell.column.renderComponent);
        }
    }

    /**
     * This method call the function defined on table settings for custom templates.
     */
    protected callOnComponentInit() {
        // Get Function from UITableSettings.
        const onComponentInitFunction = this.cell.column.getOnComponentInitFunction();
        // If have Function execute the function.
        if (onComponentInitFunction) {
            onComponentInitFunction(this.customComponent.instance);
        }
    }

    protected patchInstance() {
        Object.assign(this.customComponent.instance, this.getPatch());
    }

    protected getPatch(): ViewCell {
        return {
            value: this.cell.getValue(),
            rowData: this.cell.row.data
        };
    }
}
