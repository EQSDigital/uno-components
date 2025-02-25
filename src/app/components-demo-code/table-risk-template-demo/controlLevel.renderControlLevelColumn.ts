import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconComponent } from 'uno-ui-lib';


@Component({
  template: `
    @if (value) {
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
    }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IconComponent]
})
export class RenderControlLevelColumnComponent {
  public value: any;
}
