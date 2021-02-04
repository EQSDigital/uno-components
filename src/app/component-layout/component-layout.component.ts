import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { routes } from '../components-demo-code/routes';

@Component({
    selector: 'component-layout',
    templateUrl: 'component-layout.component.html'
})

export class ComponentLayoutComponent {
    title: string;
    component: string;

    showCode = false;

    selectedTab: 'markup' | 'ts' = 'markup';

    constructor(private route: ActivatedRoute) {
        const aux = routes.find((route: any) => route.path === this.route.snapshot.parent.url[0].path);

        this.title = aux.label || aux.path;
        this.component = `${aux.path}-demo`;
    }
}
