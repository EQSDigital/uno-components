import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    template: `
        <div *ngIf="value" class="slds-text-align--center" style="display: inline-block">
            <label class="open-sans-bold-10">{{ value.name }}</label><br>
            <label class="open-sans-12">{{ value.value | number: '1.0-2' }}%</label>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderLikelihoodColumnComponent {
    public value: any;
}
