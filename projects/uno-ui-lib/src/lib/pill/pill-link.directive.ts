import { Directive, ElementRef, Renderer2, Optional } from '@angular/core';

import { PillComponent } from './pill.component';

@Directive({
    selector: 'a',
})
export class PillLinkDirective {

    constructor(
        @Optional() pill: PillComponent,
        element: ElementRef,
        renderer: Renderer2
    ) {
        if (!pill) {
            return;
        }

        renderer.addClass(element.nativeElement, 'slds-pill__label');
        pill.unlinked = false;
    }
}
