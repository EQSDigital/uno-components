import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <uno-badge bgColor="dusk" txtColor="white">{{ rowData[objectToLength].length }}</uno-badge>
    `,
})

export class RenderBadgeComponent {
    /**
     * Variable to set the propertie of the object that represent the length.
     */
    objectToLength: string;

    @Input() rowData: any;
}
