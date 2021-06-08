import { Component, Input, OnInit } from '@angular/core';

@Component({
    template: `
        <a
            class="uno-smart-table-cell-view view-custom"
            uno-popover-trigger
            uno-popover-behavior
            unoPopover="This is an add text, description, etc for '{{ originalRenderValue }}'"
            unoPopoverTooltip="true"
            [title]="renderValue">
                {{ renderValue }}
        </a>
    `
})
export class RenderUsernameComponent implements OnInit {

    originalRenderValue: string;
    renderValue: string;
    // Configured externally @ "table-demo-component.ts"'s "settings" JSON:
    public valuePrefix = '';
    public isUpperCase: boolean;

    @Input() value: string | number;
    @Input() rowData: any;

    ngOnInit() {
        this.originalRenderValue = this.value.toString();
        this.renderValue = this.isUpperCase ?
            `${this.valuePrefix}${this.value.toString().toUpperCase()}` : `${this.valuePrefix}${this.originalRenderValue}`;

        // Don't let the (original) empty fields only with the "valuePrefix":
        if (this.renderValue === this.valuePrefix) { this.renderValue = ''; }

    }
}
