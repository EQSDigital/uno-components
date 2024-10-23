import { Directive, Host, Optional, HostBinding, ElementRef, HostListener } from '@angular/core';

// We'll need to determine if Dropdown is wrapped on (has as parent) a <uno-picklist /> (all PicklistComponents have "uno-pick-option"):
import { PickOptionDirective } from '../pick/pick-option.directive';

@Directive({
    selector: '[unoDropdownItem]',
    // host: {
    //     'tabindex': '0',
    // },
})
export class DropdownItemDirective {

    @HostBinding('attr.tabindex') tabindex = 0;

    private isFocused = false;
    private selectedClosesDropdown: boolean;

    @HostListener('focus') onFocus() {
        this.isFocused = true;
    }

    @HostListener('blur') onBlur() {
        this.isFocused = false;
    }

    // Check the click selection:
    @HostListener('click') onclick() {
        this.selectedClosesDropdown = true;
    }

    constructor(
        public element: ElementRef,
        @Host() @Optional() public parentPickOption: PickOptionDirective
    ) {
        // https://medium.com/frontend-coach/self-or-optional-host-the-visual-guide-to-angular-di-decorators-73fbbb5c8658
        // @Host() decorator makes Angular to look for the injector on the component itself.
        // if the injector is NOT FOUND there, it looks for the injector UP to its host component
        // console.warn('Do we have uno-picklist as parent?', parentPickOption);
        this.selectedClosesDropdown = false;
    }

    hasFocus() {
        return this.isFocused;
    }

    focus() {
        this.element.nativeElement.focus();
    }
}
