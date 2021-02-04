import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
    ],
    providers: [],
    bootstrap: [LayoutComponent]
})
export class LayoutModule { }