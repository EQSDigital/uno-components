import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

import { replaceClass } from '../../util/util';

@Directive({
    selector: '[unoButton]'
})

export class ButtonDirective {

    @Input('unoType') set setType(type: 'secondary' | 'blue' | 'green' | 'worksheet-default' | 'worksheet-add') {
        replaceClass(this, `${this.prefixType}${type}`, type ? `${this.prefixType}${type}` : '');
    }

    @Input('unoSize') set setSize(size: 'small' | 'x-small') {
        replaceClass(this, `${this.prefixSize}${size}`, size ? `${this.prefixSize}${size}` : '');
    }

    // Using BEM, define our prefix for all button's customized styles/classes:
    prefixType = `slds-uno-button--`;
    prefixSize = `slds-uno-button-size--`;

    constructor(
        public element: ElementRef,
        public renderer: Renderer2
    ) {
        // Define our common "button" class, for all un-button's type, size, whatever:
        this.renderer.addClass(this.element.nativeElement, 'slds-uno-button');
    }
}
