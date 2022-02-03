import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    selectedDefaultTab = 'tab2';
    selectedScopeTab = 'tabScoped3';

    newTabs: string[] = ['tab1', 'tab2', 'tab3'];

    addDetail() {
        this.newTabs.push(`tab${++this.newTabs.length}`);
    }

    protected removeTab(dynamicTab: Object) {
        this.newTabs = this.newTabs.filter(
            (tab) => tab !== dynamicTab
        );

        // ... and select the default selected tab, so content can be swipped off of the HTML:
        setTimeout(() => this.selectedDefaultTab = 'tab3');
    }
}
