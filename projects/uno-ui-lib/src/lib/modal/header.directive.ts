import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[unoModalHeader]',
    standalone: true
})
export class ModalHeaderDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}
