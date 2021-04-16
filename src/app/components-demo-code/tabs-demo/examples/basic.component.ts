import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    selectedDefaultTab = 'tab3';
    selectedScopeTab = 'tabScoped3';

    newId = 0;
    newTabs: number[] = [];

    newTabs$ = of(null);

    addDetail() {
        this.newTabs.push(this.newId++);
    }

    protected removeTab(dynamicTab: Object) {
        this.newTabs = this.newTabs.filter(
            (tab) => tab !== dynamicTab
        );
        // ... and select the default selected tab, so content can be swipped off of the HTML:
        setTimeout(() => this.selectedDefaultTab = 'tab3');
    }
}
