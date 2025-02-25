import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[unoModalFooter]',
    standalone: true
})
export class ModalFooterDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}
