import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[unoTbodyCollapseContent]',
    standalone: true
})
export class TbodyCollapseContentDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}
