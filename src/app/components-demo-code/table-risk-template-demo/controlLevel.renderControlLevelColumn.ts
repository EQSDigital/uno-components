import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    template: `
    <ng-container *ngIf="value">
        <div class="slds-align-top" style="display: inline-block">
            <uno-icon
                icon="info"
                size="xx-small"
                uno-popover-trigger
                [unoPopover]="PopoverContent"
                unoPopoverBehavior>
            </uno-icon>
        </div>
        <ng-template #PopoverContent>
            <div class="slds-p-around--small">
                {{ value.description }}
            </div>
        </ng-template>
    </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderControlLevelColumnComponent {
    public value: any;
}
