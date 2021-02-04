import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[unoModalHeader]'
})
export class ModalHeaderDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}
