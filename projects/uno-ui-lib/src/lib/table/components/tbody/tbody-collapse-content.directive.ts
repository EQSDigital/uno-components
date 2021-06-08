import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[unoTbodyCollapseContent]' })
export class TbodyCollapseContentDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}
