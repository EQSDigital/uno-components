import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';







import { CellComponent } from './cell.component';
import { CustomEditComponent } from './cell-edit-mode/custom-edit.component';
import { DefaultEditComponent } from './cell-edit-mode/default-edit.component';
import { EditCellComponent } from './cell-edit-mode/edit-cell.component';
import { CheckboxEditorComponent } from './cell-editors/checkbox-editor.component';
import { LookupEditorComponent } from './cell-editors/lookup-editor.component';
import { InputEditorComponent } from './cell-editors/input-editor.component';
import { InputNumberEditorComponent } from './cell-editors/input-number-editor.component';
import { SelectEditorComponent } from './cell-editors/select-editor.component';
import { TextareaEditorComponent } from './cell-editors/textarea-editor.component';
import { CustomViewComponent } from './cell-view-mode/custom-view.component';
import { ViewCellComponent } from './cell-view-mode/view-cell.component';
import { SwitchEditorComponent } from './cell-editors/switch-editor.component';

const CELL_COMPONENTS = [
    CellComponent,
    CustomEditComponent,
    DefaultEditComponent,
    EditCellComponent,
    CheckboxEditorComponent,
    LookupEditorComponent,
    InputEditorComponent,
    InputNumberEditorComponent,
    SelectEditorComponent,
    TextareaEditorComponent,
    CustomViewComponent,
    ViewCellComponent,
    SwitchEditorComponent
];

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ...CELL_COMPONENTS
],
    exports: [
        ...CELL_COMPONENTS,
    ],
})
export class CellModule { }
