import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { DefaultEditorDirective } from 'projects/uno-ui-lib/src/lib/table';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <uno-input-tags
            [objects]="skills"
            [selectedObjects]="selectedValues"
            (objectsSelected)="objectsSelected($event)">
        </uno-input-tags>
    `
})

export class RenderInputTagsComponent extends DefaultEditorDirective implements OnInit {
    @Input() value: any[];
    @Input() rowData: any;

    skills: any[];

    selectedValues: any[] = [];

    constructor() {
        super();
    }

    ngOnInit() {
        if (typeof this.value === 'string') {
            this.selectedValues = [];
        } else if (this.value instanceof Array) {
            this.selectedValues = this.value;
        }
    }

    objectsSelected(objs: any[]) {
        this.editingFormGroup.controls.skills.setValue(objs);
    }
}
