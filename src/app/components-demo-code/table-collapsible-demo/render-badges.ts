import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { PillComponent } from 'uno-ui-lib';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @for (skill of rowData.skills; track skill) {
          <uno-pill>
            {{ skill.name }}
          </uno-pill>
        }
        `,
    standalone: true,
    imports: [PillComponent],
})

export class RenderBadgesComponent {
    @Input() rowData: any;
}
