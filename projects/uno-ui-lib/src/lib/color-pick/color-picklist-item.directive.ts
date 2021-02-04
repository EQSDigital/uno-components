import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[uno-color-picklist-item]' })

export class ColorPickItemDirective {

    constructor(
        public templateRef: TemplateRef<any>
    ) { }
}
