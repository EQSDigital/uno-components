import { Directive,  HostListener } from '@angular/core';

import { PopoverTriggerDirective } from './popover-trigger.directive';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[uno-popover-click-behavior]' })
export class PopoverClickBehaviorDirective {

    triggerElement: HTMLElement;
    isInfoPopoverOpened = false;

    constructor(
        // *********************************************************************************
        // On ClickToClose Directive, we also have access to all Trigger Directive's Methods:
        // (like "unoPopover", "unoPopoverHeader", "unoPopoverOpen()", etc.)
        // *********************************************************************************
        private trigger: PopoverTriggerDirective,
    ) { }

    // Clicking specific on TRIGGER (icon, button, div, span, etc.):
    @HostListener('click', ['$event'])
    public onClick(evt) {
        // Don't let any other coded click event grab this 'click':
        evt.preventDefault();
        evt.stopPropagation();

        // As TRIGGER can be any HTML tag, we grab it here:
        this.triggerElement = evt.target;

        if (!this.isInfoPopoverOpened) {
            // Trigger <uno-popover /> to open:
            this.trigger.unoPopoverOpen = true;
        } else {
            this.trigger.unoPopoverOpen = false;
        }
        // Update opened state:
        this.isInfoPopoverOpened = !this.isInfoPopoverOpened;
    }

    // Clicking... all over!
    @HostListener('document:click', ['$event'])
    public closePopoverTrigger (evt) {
        // Must be opened, to close it! ;-)
        if (this.isInfoPopoverOpened === true) {

            const popoverElement = this.trigger.popover.element.nativeElement;
            const closeIconTrigger = popoverElement.querySelector('.popover-close-icon');

            if (
                // Icon "close" was clicked:
                closeIconTrigger.contains(evt.target)
                ||
                // Anywere outside popoverElement (that's NOT the trigger itself!) was clicked:
                ( !popoverElement.contains(evt.target) && evt.target !== this.triggerElement )
            ) {
                this.trigger.unoPopoverOpen = false;
                this.isInfoPopoverOpened = false;
            }
        }
    }

}
