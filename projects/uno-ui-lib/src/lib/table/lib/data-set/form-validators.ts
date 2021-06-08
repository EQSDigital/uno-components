import { FormGroup, FormControl, AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { Grid } from '../grid';
import { Column } from './column';

export class SetUpFormControllers {

    static doFormControllersOn(grid: Grid, myForm: FormGroup) {
        // When table settings changes it's need "reset" the form controls
        Object.keys(myForm.controls).forEach((key: string) => myForm.removeControl(key));

        grid.dataSet.columns.forEach((column) => {
            const colEditorSetings: { [k: string]: any } = column.editor;
            // Does it has inicial "value"...?
            const initColValue = colEditorSetings ?
                colEditorSetings.initValue ? colEditorSetings.initValue : '' : '';

            // Does it has defined any Form Validators for each column...?
            const colValidators = colEditorSetings ?
                colEditorSetings.validators ? colEditorSetings.validators : [] : [];

            // Inititate our Validators collector types array to push Validators each time a column has (1 or several!)
            const formValidators = new Array<ValidatorFn>();

            // OK; we can start by initializing CONTROLS per column
            // myForm.addControl(column.id, new FormControl(
            //     {
            //         value: initColValue,
            //         disabled: !column.isEditable
            //     }
            // ));

            myForm.addControl(column.id, new FormControl(initColValue));

            if (column.editor && column.editor.validators) {
                if (colValidators.required) {
                    formValidators.push(Validators.required);
                }

                if (colValidators.hasOwnProperty('min')) {
                    formValidators.push(Validators.min(colValidators.min));
                }

                if (colValidators.hasOwnProperty('max')) {
                    formValidators.push(Validators.max(colValidators.max));
                }

                if (colValidators.hasOwnProperty('minLength')) {
                    formValidators.push(Validators.minLength(colValidators.minLength));
                }

                if (colValidators.hasOwnProperty('maxLength')) {
                    formValidators.push(Validators.maxLength(colValidators.maxLength));
                }

                if (colValidators.pattern) {
                    formValidators.push(Validators.pattern(new RegExp(colValidators.pattern)));
                }

                // OK! Push the aray into FormGroup CONTROLS:
                // =============================================================
                // INSPECT THE COLUMNS THAT ARE CURRENTLY CONFIG, at instalation, WITH VALIDATORS, AND WHICH ONES:
                // =============================================================
                myForm.controls[column.id].setValidators(formValidators);
                // ****************************************************************************
                // Update the FormGroup once you have run either setValidators() or clearValidators()!
                //      (last, clears them ALL from an Input)
                // ****************************************************************************
                myForm.controls[column.id].updateValueAndValidity();
            }
        });
    }

    static formErrorsCollection(grid: Grid, column: Column, myForm: FormGroup) {
        const inputErrorsCollection = [];

        Object.keys(myForm.controls).forEach((inputName: string) => {
            const inputControl: AbstractControl = myForm.get(inputName);

            // Each Control can have MORE than one error type!
            if (inputControl.errors && inputControl.dirty) {
                // Beacuse of CREATE, we only consider an error IF control is TOUCHED - see TableComponent's "checkValidators()"
                // On EDITING, ALL controls are immediately marked as TOUCHED, so user can be advised of the disabled submit button.
                // Translate Object DATA to human readeable strings:
                const thisInputColumn = grid ? grid.dataSet.columns.filter((eachColumn) => eachColumn.id === inputName)[0] : column;

                const translErrors = this.translateThisInputErrors(thisInputColumn, inputControl);

                // Collect this Input one, to send them all back, to whomever calls this Class Method:
                inputErrorsCollection.push({
                    input: inputName,
                    value: inputControl.value,
                    raw: inputControl.errors,
                    translated: translErrors
                });
            }
        });

        // Return them all, grouped, and already translated, for each Input controller:
        return inputErrorsCollection;
    }

    static enableControlWaitingValue(grid: Grid, form: FormGroup) {
        grid.dataSet.columns.forEach((col: Column) =>
            Object.keys(form.controls).forEach((key: string) => {
                if (col.editor && col.editor.isEditableUntil && col.editor.isEditableUntil === key && form.controls[key].value) {
                    form.controls[col.id].enable({ emitEvent: false });
                }
            })
        );
    }

    private static translateThisInputErrors(column: any, controller: AbstractControl) {
        const value = controller.value;
        const errorTranslation = [];

        // About this column Input settings => get custom installation Validators messages:
        // "editor" they all must have, if this Validation code point was reached. Check for "validatorMsgs":
        const thisControllerMsgs = column.editor.validatorMsgs ? column.editor.validatorMsgs : {};

        Object.keys(controller.errors).forEach((validatorErrors) => {
            switch (validatorErrors) {
                case 'required':
                    if (thisControllerMsgs.hasOwnProperty('required')) {
                        errorTranslation.push(thisControllerMsgs.required);
                    } else {
                        errorTranslation.push('It\'s a required Input.');
                    }
                    break;

                case 'email':
                    if (thisControllerMsgs.hasOwnProperty('email')) {
                        errorTranslation.push(thisControllerMsgs.email.replace('[value field]', value));
                    } else {
                        errorTranslation.push(`${value} does not have a proper email format (a@b.c).`);
                    }
                    break;

                case 'minlength':
                    if (thisControllerMsgs.hasOwnProperty('minlength')) {
                        errorTranslation.push(thisControllerMsgs.minlength.replace('[minlength field]', controller.errors.minlength));
                    } else {
                        errorTranslation.push(`Input must have at least ${controller.errors.minlength.requiredLength} chars.`);
                    }
                    break;

                case 'maxlength':
                    const maxL = controller.errors.maxlength.requiredLength;
                    const currentL = controller.errors.maxlength.actualLength;

                    if (thisControllerMsgs.hasOwnProperty('maxlength')) {
                        errorTranslation.push(
                            thisControllerMsgs.maxLength
                                .replace('[maxlength field]', maxL)
                                .replace('[value field]', value)
                                .replace('[current length field]', currentL)
                        );
                    } else {
                        errorTranslation.push(`Input can not exceed ${maxL} chars - ${value} has ${currentL}.`);
                    }
                    break;
                case 'min':
                    if (thisControllerMsgs.hasOwnProperty('min')) {
                        errorTranslation.push(thisControllerMsgs.min.replace('[min field]', controller.errors.min));
                    } else {
                        errorTranslation.push(`The input value must be greater than or equal to ${controller.errors.min.min}`);
                    }
                    break;
                case 'max':
                    if (thisControllerMsgs.hasOwnProperty('max')) {
                        errorTranslation.push(thisControllerMsgs.max.replace('[max field]', controller.errors.max));
                    } else {
                        errorTranslation.push(`The input value must be less than or equal to ${controller.errors.max.max}.`);
                    }
                    break;

                default:
                    errorTranslation.push(`ERROR! ${validatorErrors} Validator error was NOT expected!`);
                    break;
            }
        });

        return errorTranslation;
    }
}
