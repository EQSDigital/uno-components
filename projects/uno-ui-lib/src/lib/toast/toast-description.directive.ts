import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[unoToastDescription]'
})
export class ToastDescriptionDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}