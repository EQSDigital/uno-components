import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[unoModalFooter]'
})
export class ModalFooterDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}
