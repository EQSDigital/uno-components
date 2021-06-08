import { Directive, OnChanges, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Cell } from './data-set/cell';
import { ClickOutsideDefault } from './click-outside-default';
import { SetUpFormControllers } from './data-set/form-validators';

export interface Editor {
    cell: Cell;
    inputClass: string;
    onStopEditing: EventEmitter<any>;
    onEdited: EventEmitter<any>;
    onClick: EventEmitter<any>;
}

@Directive({ selector: 'default-editor' })
// Allthough this is a simple Class definition,
// in order to import it @ "uno-ui-lib-module.ts" needs to be a @Pipe, @Directive or @Component

export class DefaultEditorDirective extends ClickOutsideDefault implements Editor, OnChanges, OnDestroy {

    // Receive, here (better; on the component that extends THIS class!), the Table's "editingForm":
    @Input() editingFormGroup: FormGroup;

    @Input() cell: Cell;
    @Input() inputClass: string;
    @Input() updateColumnList: any;

    @Output() onStopEditing = new EventEmitter<any>();
    @Output() onEdited = new EventEmitter<any>();
    @Output() onClick = new EventEmitter<any>();

    errorsData: any;
    openValidatorPopover = false;

    protected subscription$ = new Subscription();

    ngOnChanges() {
        if (this.cell.column.editor) {
            // Has popover showing errors?
            // if (this.cell.column.editor.popoverErrors) {
            const inputController = this.editingFormGroup.get(this.cell.column.id);

            if (inputController) {
                // Subscribe to any Input Controllers Validator status changes:
                this.subscription$.add(
                    inputController.statusChanges.subscribe(
                        (inputStatus) => {
                            // Translate the errors.
                            // Next Class (SetUpFormControllers) Method (formErrorsCollection()) will return a JSON of type:
                            /**
                                {
                                    input: string,
                                    raw: OBJ of errors type,
                                    translated: ARRAY of string (each for each error type found in "raw"),
                                    value: string
                                }
                             */
                            this.errorsData = SetUpFormControllers.formErrorsCollection(null, this.cell.column, this.editingFormGroup);
                            // Open/Close Popover if Controller errors are detected:
                            this.openValidatorPopover = (inputStatus === 'INVALID' && this.errorsData.length > 0) ? true : false;
                        }
                    )
                );
            }
            // }
        }
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
}
