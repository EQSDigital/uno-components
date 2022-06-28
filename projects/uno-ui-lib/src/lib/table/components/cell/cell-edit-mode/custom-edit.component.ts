import { Component, ViewChild, ViewContainerRef, OnChanges, OnDestroy, Input, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { EditCellDefault } from '../../../lib/edit-cell-default';
import { ViewCell } from '../../../lib/view-cell-interface';

@Component({
    selector: 'table-cell-custom-editor',
    template: `<ng-template #dynamicTarget></ng-template>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomEditComponent extends EditCellDefault implements OnInit, OnChanges, OnDestroy {

    /**
     * Variable to set the instance of the Component setted on UnoTableSettings.
     */
    customComponent: any;

    /**
     * Variable with instance of the form.
     */
    @Input() editingFormGroup: FormGroup;

    /**
     * Variable to set the instance of the ViewContainerRef from the template.
     */
    @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true }) dynamicTarget: ViewContainerRef;

    /**
     * Variable to set the instance of Subscription.
     */
    subscriptions$: Subscription = new Subscription();

    constructor() {
        super();
    }

    ngOnInit() {
        this.callOnComponentInit();
        this.patchInstance();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.cell && !this.customComponent) {
            // Create component and set the instance of the Component.
            this.customComponent = this.dynamicTarget.createComponent(this.cell.column.editor.component);

            // set @Inputs and @Outputs of custom component
            this.customComponent.instance.cell = this.cell;

            this.customComponent.instance.editingFormGroup = this.editingFormGroup;
            this.customComponent.instance.inputClass = this.inputClass;

            if (this.customComponent.instance.onStopEditing) {
                this.customComponent.instance.onStopEditing.subscribe(() => this.onStopEditing());
            }

            if (this.customComponent.instance.onEdited) {
                this.customComponent.instance.onEdited.subscribe((event: any) => this.onEdited(event));
            }

            if (this.customComponent.instance.onClick) {
                this.customComponent.instance.onClick.subscribe((event: any) => this.onClick(event));
            }
        }

        if (changes.editingFormGroup && changes.editingFormGroup.currentValue) {
            this.subscriptions$.add(
                this.editingFormGroup.controls[this.cell.column.id].valueChanges.subscribe((value) => this.cell.newValue = value)
            );
        }
    }

    ngOnDestroy() {
        if (this.customComponent) {
            this.customComponent.destroy();
        }

        this.subscriptions$.unsubscribe();
    }

    /**
     * This method is called on constructor to get the function setted on UnoTableSettings,
     * and pass the instance of the Component to set the variables with values.
     */
    protected callOnComponentInit() {
        const onComponentInitFunction = this.cell.column.getOnComponentInitFunctionExpanded();
        if (onComponentInitFunction) {
            onComponentInitFunction(this.customComponent.instance);
        }
    }

    /**
     * This method assign to the instance of component the object returned to getPatch() method.
     */
    protected patchInstance() {
        Object.assign(this.customComponent.instance, this.getPatch());
    }

    /**
     * This method return a ViewCell object.
     *
     * @returns The ViewCell object with values of the cell.
     */
    protected getPatch(): ViewCell {
        return {
            value: this.cell.getValue(),
            rowData: this.cell.row.data
        };
    }
}
