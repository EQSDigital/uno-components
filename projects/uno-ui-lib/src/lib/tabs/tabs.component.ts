import {
    Component, AfterContentInit, QueryList, ContentChildren, Input, Output,
    EventEmitter, ElementRef, Renderer2, ChangeDetectionStrategy
} from '@angular/core';

import { isInt } from '../../util/util';

import { TabDirective } from './tab.directive';

/**
 * The Tabs component contains <unoTab />, TabDirective template
 *
 * @example
 *
    <uno-tabs [(selected)]="selectedTab">
        <ng-template unoTab unoTabId="tab1" heading="Tab 1">
            Tab 1
        </ng-template>
        <ng-template unoTab unoTabId="tab2" heading="Tab 2">
            Tab 2
        </ng-template>
        <ng-template unoTab unoTabId="tab2" heading="Tab 3">
        ...
    </uno-tabs>
 */

@Component({
    selector: 'uno-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})

export class TabsComponent implements AfterContentInit {

    // Specifies the type
    @Input() type: 'default' | 'scoped' = 'default';
    // Specifies the aligment of the tabs heading and tabPanel text
    @Input() alignment = 'left';
    // Allows custom active tab's dash color (actually background-color of ::after pseudo-element):
    @Input() activeTabDashColor = '#1589ee'; // = '#1825aa'; Can't be a CSS var (it's a var already) - so '--sapphire'; NOT ALLOWED!

    // Specifies if Tab directive is bringing custom style (bgColor, txtColor, etc.), to apply when active
    activeTabCustomStyle = {};

    // Grab the collection of the tabs's tabs:
    @ContentChildren(TabDirective) tabs: QueryList<TabDirective>;

    // Specifies the tab selected
    activeTab: TabDirective;
    selected: string | number | TabDirective;
    @Input('selected') set setSelected(selectedTab: string | number | TabDirective) {
        if (selectedTab === this.selected) { return; }

        // Grab the value, even if it's a plain string (on loading)
        this.selected = selectedTab;
        // To proceed, wait for content to initialize - can't "this.activate()"" with no HTML tabs...
        if (!this.tabs) { return; }

        // If we reach this ponit, mark Tab Directive as (the one) active:
        this.activate();
    }

    // Emits active Tab is going to change
    @Output() selectedChange = new EventEmitter<TabDirective>();

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) { }

    ngAfterContentInit() {
        // Initial selection after all tabs are created
        this.activate();

        // Was not define @ HTML's "[(selected)]...? So we still don't have any "this.activeTab" => activate, by default, the 1st Tab:
        if (!this.activeTab) {
            setTimeout(() => {
                const forcedActiveTab = this.tabs.first;

                // Select it:
                this.select(forcedActiveTab);
                // Mark it as "active"
                this.activeTab = forcedActiveTab;
                // Tab Directive selected is now as "active" => pass in the eventual (tagged at any Tab Directive HTML) custom style:
                this.applyCustomStyleActiveTab();
            });
        }

        // Style possible active tab's underscore dash color:
        this.renderer.setAttribute(this.element.nativeElement, 'style', '--active-tab-dash-bg-color: ' + this.activeTabDashColor);

        // Check if ANY tab has  "@Input() headingSub".
        // If so, add ".has-heading-sub" to ALL Tabs (ul li a.slds-tabs--default__link)
        // => main Heading goes up, creating some room for (one or any) "headingSub" sub-titles:
        const tabs = this.tabs.toArray();
        const arrayTabsHeadingSub = tabs.filter((eachTab) => eachTab.headingSub);

        if (arrayTabsHeadingSub.length > 0) {
            this.renderer.addClass(this.element.nativeElement, 'has-heading-sub');
        }

    }

    // HTML <li> click() event, if NOT "disableTab"=true:
    select(tab: TabDirective) {
        if (tab && !tab.disableTab) {
            this.selectedChange.emit(tab);
        }
    }

    // Activate Tabs through keyboard left/right arrows:
    move(evt: Event, moves: number) {
        evt.preventDefault();

        const tabs = this.tabs.toArray();
        const selectedIndex = tabs.indexOf(this.activeTab);
        this.select(tabs[(tabs.length + selectedIndex + moves) % tabs.length]);
    }

    /**
     * AUX functions:
     */
    private applyCustomStyleActiveTab() {
        if (this.activeTab && this.activeTab.hasOwnProperty('customContentStyle')) {
            this.activeTabCustomStyle = this.activeTab.customContentStyle;
        }
    }

    private activate() {
        // Deactivate it eventualy older one:
        if (this.activeTab) {
            this.activeTab.active = false;
        }

        // Try to activate the one declared as "this.selected":
        this.activeTab = this.findTab();

        // Found it? Great:
        if (this.activeTab) {
            this.activeTab.active = true;
            // Once we have our Tab Directive as "active", pass in the eventual custom style tagged at any Tab Directive HTML
            this.applyCustomStyleActiveTab();
        }
    }

    private findTab(value: any = this.selected): TabDirective {
        if (value instanceof TabDirective) {
            return value;
        }

        if (isInt(value)) {
            return this.tabs.toArray()[+value];
        }

        return this.tabs.toArray().find((t: TabDirective) => {
            return t.unoTabId && t.unoTabId === value;
        });
    }
}
