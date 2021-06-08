import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    template: `<uno-icon [withOpacity]="false" icon="comments" size="small"></uno-icon>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderCommentsColumnComponent {
    public value: any;
}
