import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    template: `
        <uno-icon [withOpacity]="false" icon="doc" size="small"></uno-icon>
        <label style="font-weight: bold; padding-left: 10px">{{ value }}</label>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderDocumentPopOverColumnComponent {
    public value: any;
}
