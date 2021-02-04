import { Directive, HostListener, HostBinding } from '@angular/core';

import { PopoverTriggerDirective } from './popover-trigger.directive';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[unoPopoverBehavior]' })
export class PopoverBehaviorDirective {

    @HostBinding('attr.tabindex') public tabindex = 0;

    constructor(
        // *********************************************************************************
        // On Behaviour Directive, we also have access to all Trigger Directive's Methods:
        // (like "unoPopover", "unoPopoverHeader", "unoPopoverOpen()", etc.)
        // *********************************************************************************
        private trigger: PopoverTriggerDirective
    ) { }

    @HostListener('mouseenter')
    @HostListener('focus')
    public onMouseOver() {
        // Trigger <uno-popover /> to open:
        this.trigger.unoPopoverOpen = true;
    }

    @HostListener('mouseleave')
    @HostListener('blur')
    public onMouseOut() {
        // Trigger <uno-popover /> closing:
        this.trigger.unoPopoverOpen = false;
    }
}
