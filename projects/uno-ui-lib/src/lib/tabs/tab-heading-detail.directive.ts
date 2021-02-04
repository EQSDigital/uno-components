import { Directive, Input, TemplateRef, ContentChild, AfterContentInit } from '@angular/core';

import { TabDirective } from './tab.directive';

/*
 * <ng-template unoTab [heading="..."]>
 *    <ng-template unoTabHeading>...</ng-template>
 *    <ng-template unoTabContent>
 *       Content goes here...
 *    </ng-template>
 * </ng-template>
 */
@Directive({ selector: '[unoTabHeading]' })
export class TabHeadingDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}

@Directive({ selector: '[unoTabContent]' })
export class TabContentDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}

@Directive({
    selector: 'uno-tab',
    providers: [{
        provide: TabDirective,
        useExisting: TabHeadingDetailDirective
    }],
})
export class TabHeadingDetailDirective extends TabDirective implements AfterContentInit {
    @Input() unoTabId: string;
    @Input() heading: string | TemplateRef<any>;
    // @Output() onActivate = new EventEmitter<TabDirective>();
    // @Output() onDeactivate = new EventEmitter<TabDirective>();

    @ContentChild(TabHeadingDirective) headingTemplate: TabHeadingDirective;
    @ContentChild(TabContentDirective) contentTemplate: TabContentDirective;

    ngAfterContentInit() {
        if (this.headingTemplate) {
            this.heading = this.headingTemplate.templateRef;
        }
        this.templateRef = this.contentTemplate.templateRef;
    }
}
