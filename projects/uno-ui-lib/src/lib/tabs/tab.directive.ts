import { Directive, OnChanges, Input, Optional, TemplateRef } from '@angular/core';

/**
 * TabDirective ([unoTab]), is a structural Directive, to be used by <uno-tabs /> library component.
 * It's specifically tailored to create and destroy DOM elements, changing the HTML structure
 * Will be the minimum unit of <uno-tabs /> component library
 *
 * @example
 *
    <ng-template unoTab unoTabId="tab1" heading="Tab 1">
        Tab 1
    </ng-template>
    <ng-template unoTab unoTabId="tab2" heading="Tab 2">
        Tab 2
    </ng-template>
    <ng-template unoTab unoTabId="tab3" heading="Tab 3">
    ...
 *
 */

@Directive({
    selector: '[unoTab]'
})

export class TabDirective implements OnChanges {

    /**
     * Specifies the id of the tab
     */
    @Input() unoTabId: string;

    /**
     * Specifies the title and sub-title and if its uppercase (default) or natural case
     */
    @Input() heading: string | TemplateRef<any>;
    @Input() headingSub: string;
    @Input() headingNaturalCase: boolean;

    /**
     * Specifies the if tab is disable or not
     */
    @Input() disableTab = false;

    /**
     * Allow to set custom bgColor/txtColor:
     */
    @Input() bgColorHeading: string;
    @Input() txtColorHeading: string;
    @Input() bgColorContent: string;
    @Input() txtColorContent: string;

    /**
     * ... into our component's "customStyle" object, to be HTML applied:
     */
    customHeadingStyle = {};
    customContentStyle = {};

    /**
     * This Tab component is currently active (mounted) @ embedded view linked to this TemplateRef:
     */
    isTabActive = false;

    constructor(
        @Optional() public templateRef: TemplateRef<any>
    ) { }

    // About color/backgorund-color CSS independent costumization: before DOM ready (being injected through HTML's NG "customStyle" var)
    ngOnChanges() {
        // customStyling:
        //  - for the title/heading
        if (this.bgColorHeading) {
            this.customHeadingStyle['background-color'] = `var(--${this.bgColorHeading})`;
        }

        if (this.txtColorHeading) {
            this.customHeadingStyle['color'] = `var(--${this.txtColorHeading})`;
        }

        //  - for the content/activeTab
        if (this.bgColorContent) {
            this.customContentStyle['background-color'] = `var(--${this.bgColorContent})`;
        }

        if (this.txtColorContent) {
            this.customContentStyle['color'] = `var(--${this.txtColorContent})`;
        }
    }

    // Upon a tab click, set the active Tab component to be mounted by Angular (and unmount the previously active one):
    set active(active: boolean) {
        if (active === this.isTabActive) {
            return;
        }

        this.isTabActive = active;
    }
}
