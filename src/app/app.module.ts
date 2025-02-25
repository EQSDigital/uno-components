import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { LayoutComponent } from './layout/layout.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'components', loadChildren: () => import('./components-demo-code/components.module').then(m => m.ComponentsModule) }
        ]
    },
];


