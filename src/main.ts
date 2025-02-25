import { enableProdMode, importProvidersFrom } from '@angular/core';

import { HttpLoaderFactory } from './app/app.module';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { LayoutComponent } from './app/layout/layout.component';
import { withHashLocation, withInMemoryScrolling, provideRouter, Routes } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { LayoutModule } from './app/layout/layout.module';
import { provideAnimations } from '@angular/platform-browser/animations';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'components', loadChildren: () => import("./app/components-demo-code/components.module").then(m => m.ComponentsModule) }
        ]
    },
];


if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(LayoutModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes, withHashLocation(), withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }))
    ]
})
    .catch(err => console.log(err));
