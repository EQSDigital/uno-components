import { Input, OnChanges, OnDestroy, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Grid } from './grid';
import { ClickOutsideDefault } from './click-outside-default';
import { SetUpFormControllers } from './data-set/form-validators';

@Directive()
export class DefaultCreateSaveCancel extends ClickOutsideDefault implements OnChanges, OnDestroy {

    // Recieve, here (better; on the components that EXTEND THIS class!), the Table's "editingForm":
    @Input() editingFormGroup: FormGroup;

    @Input() grid: Grid;

    errorsData: any;
    openValidatorPopover = false;

    private subscription$: Subscription;

    // ==================================================
    ngOnChanges() {

        // Subscribe to any Input Controllers Validator status changes:
        if (this.grid.getSetting('rowPopoverErrors')) {
            this.subscription$ = this.editingFormGroup.statusChanges.subscribe(
                (inputStatus) => {
                    // Translate the errors.
                    // Next Class (SetUpFormControllers) Method (formErrorsCollection()) will return a JSON of type:
                    /**
                        {
                            input: string
                            , raw: OBJ of errors type
                            , translated: ARRAY of string (each for each error type found in "raw")
                            , value: string
                        }
                     */
                    this.errorsData = SetUpFormControllers.formErrorsCollection(this.grid, null, this.editingFormGroup);
                    // Open/Close Popover if Controller errors are detected:
                    this.openValidatorPopover = (inputStatus === 'INVALID' && this.errorsData.length > 0) ? true : false;
                }
            );
        }
    }

    ngOnDestroy() {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
    // ==================================================
}
