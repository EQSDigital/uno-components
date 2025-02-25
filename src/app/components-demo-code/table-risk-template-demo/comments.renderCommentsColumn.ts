import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconComponent } from 'uno-ui-lib';

@Component({
    template: `<uno-icon [withOpacity]="false" icon="comments" size="small"></uno-icon>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IconComponent]
})
export class RenderCommentsColumnComponent {
    public value: any;
}
