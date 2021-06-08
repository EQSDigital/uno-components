import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <uno-pill *ngFor="let skill of rowData.skills">
            {{ skill.name }}
        </uno-pill>
    `,
})

export class RenderBadgesComponent {
    @Input() rowData: any;
}
