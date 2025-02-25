import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent } from 'uno-ui-lib';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <uno-badge bgColor="dusk" txtColor="white">{{ rowData[objectToLength].length }}</uno-badge>
    `,
    standalone: true,
    imports: [BadgeComponent],
})

export class RenderBadgeComponent {
    /**
     * Variable to set the propertie of the object that represent the length.
     */
    objectToLength: string;

    @Input() rowData: any;
}
