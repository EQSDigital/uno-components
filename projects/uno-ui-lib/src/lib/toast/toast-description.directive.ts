import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[unoToastDescription]',
    standalone: true
})
export class ToastDescriptionDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}