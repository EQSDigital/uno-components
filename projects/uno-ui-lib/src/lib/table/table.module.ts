import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// The Table component of the library:
import { TableComponent } from './table.component';
// Components, Directives, classes @ Table that will be used EXTERIOR App:
import { DefaultEditorDirective } from './index';
// MODULES used @ <uno-smart-table />:
import { CellModule } from './components/cell/cell.module';
import { TBodyModule } from './components/tbody/tbody.module';
import { THeadModule } from './components/thead/thead.module';
import { HeaderModule } from './components/header/header.module';

// DIRECTIVES
import { TbodyCollapseContentDirective } from './components/tbody/tbody-collapse-content.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CellModule,
        TBodyModule,
        THeadModule,
        TranslateModule,
        HeaderModule
    ],
    exports: [
        TableComponent,
        DefaultEditorDirective,
        CellModule,
        TbodyCollapseContentDirective
    ],
    declarations: [
        TableComponent,
        DefaultEditorDirective,
        TbodyCollapseContentDirective
    ],
    providers: [],
})
export class UnoTableModule { }
