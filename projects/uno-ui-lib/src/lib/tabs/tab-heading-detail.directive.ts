import { Directive, TemplateRef, ContentChild, AfterContentInit } from '@angular/core';

import { TabDirective } from './tab.directive';

/*
 * <uno-tab [heading="..."]>
 *    <ng-template unoTabHeading>...</ng-template>
 *    <ng-template unoTabContent>
 *       Content goes here...
 *    </ng-template>
 * </uno-tab>
 */
@Directive({
    selector: '[unoTabHeading]',
    standalone: true
})
export class TabHeadingDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}

@Directive({
    selector: '[unoTabContent]',
    standalone: true
})
export class TabContentDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}

@Directive({
    selector: 'uno-tab',
    providers: [{
            provide: TabDirective,
            useExisting: TabHeadingDetailDirective
        }],
    standalone: true,
})
export class TabHeadingDetailDirective extends TabDirective implements AfterContentInit {

    @ContentChild(TabHeadingDirective) headingTemplate: TabHeadingDirective;
    @ContentChild(TabContentDirective) contentTemplate: TabContentDirective;

    ngAfterContentInit() {
        if (this.headingTemplate) {
            this.heading = this.headingTemplate.templateRef;
        }
        this.templateRef = this.contentTemplate.templateRef;
    }
}
