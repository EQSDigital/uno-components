import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[uno-picklist-item]' })

export class PickItemDirective {

    constructor(
        public templateRef: TemplateRef<any>
    ) { }

}
