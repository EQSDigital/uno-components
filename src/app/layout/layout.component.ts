import { Component } from '@angular/core';

import { routes } from '../components-demo-code/routes';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
})
export class LayoutComponent {

    title = 'UNO UI Library DEMO';
    links = routes;
    now = +new Date();

    getLabel(route: any) {
        if (route.label) {
            return route.label;
        }

        const path = route.path;
        return path.charAt(0).toUpperCase() + path.slice(1);
    }
}