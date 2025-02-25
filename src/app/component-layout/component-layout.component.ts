import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MarkdownComponent } from 'ngx-markdown';

import { routes } from '../components-demo-code/routes';
import { TabsComponent } from 'uno-ui-lib';

@Component({
    selector: 'component-layout',
    templateUrl: 'component-layout.component.html',
    standalone: true,
    imports: [TabsComponent, MarkdownComponent]
})

export class ComponentLayoutComponent {
    title: string;
    component: string;

    showCode = false;

    selectedTab: 'markup' | 'ts' = 'markup';

    constructor(private readonly route: ActivatedRoute) {
        const aux = routes.find((route: any) => route.path === this.route.snapshot.parent.url[0].path);

        this.title = aux.label || aux.path;
        this.component = `${aux.path}-demo`;
    }
}
