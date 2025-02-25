import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TableComponent } from './table.component';
import { CellModule } from './components/cell/cell.module';
import { TBodyModule } from './components/tbody/tbody.module';
import { THeadModule } from './components/thead/thead.module';




@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CellModule,
    TBodyModule,
    THeadModule,
    TranslateModule,
    TableComponent
],
    exports: [
        TableComponent,
        CellModule
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoTableModule { }
