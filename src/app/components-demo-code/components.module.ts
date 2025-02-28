import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

import { routes as demoRoutes } from './routes';
import { ComponentsComponent } from './components.component';

const routes: Routes = [
    {
        path: '',
        component: ComponentsComponent,
        children: demoRoutes
    },
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild([
            {
                path: '',
                redirectTo: demoRoutes[0].path,
                pathMatch: 'full'
            },
            ...routes,
        ]),
        MarkdownModule.forRoot({
            loader: HttpClient,
            sanitize: SecurityContext.NONE
        }),
        ComponentsComponent
    ]
})
export class ComponentsModule { }
