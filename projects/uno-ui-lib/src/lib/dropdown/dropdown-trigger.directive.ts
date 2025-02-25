import { Directive, HostBinding, HostListener, ElementRef, OnDestroy } from '@angular/core';

import { DropdownDirective } from './dropdown.directive';

@Directive({
    selector: '[unoDropdownTrigger]',
    standalone: true,
})
export class DropdownTriggerDirective implements OnDestroy {

    private parentFocusEventSubscription: any;

    @HostBinding('attr.aria-haspopup') haspopup = true;

    constructor(
        private element: ElementRef,
        private dropdown: DropdownDirective
    ) {
        this.parentFocusEventSubscription = this.dropdown.triggerFocusEventEmitter.subscribe(this.focus.bind(this));
    }

    ngOnDestroy() {
        this.parentFocusEventSubscription.unsubscribe();
    }

    @HostListener('click') toggleOpen() {
        this.dropdown.toggle();
    }

    @HostListener('keydown.arrowdown', ['$event'])
    onKeyDownOpen($event: Event) {
        $event.preventDefault();
        this.dropdown.toggle(true);
    }

    focus() {
        this.element.nativeElement.focus();
    }
}
