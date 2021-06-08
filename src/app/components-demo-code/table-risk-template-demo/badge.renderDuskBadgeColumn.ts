import { Component, ChangeDetectionStrategy, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';

@Component({
    template: `
        <div [ngSwitch]="checkIfArray" (click)="badgeClick.emit()" [style.cursor]="isClick ? 'pointer' : 'default'">
            <uno-badge *ngSwitchCase="false" bgColor="dusk" txtColor="white">{{ value || 0 }}</uno-badge>
            <uno-badge *ngSwitchCase="true" bgColor="dusk" txtColor="white">{{ rowData[objectToLength].length }}</uno-badge>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderDuskBadgeColumnComponent implements OnInit {
    /**
     * Variable to set the propertie of the object that represent the length.
     */
    public objectToLength: string;

    // These are the natural Inputs
    public value: any;

    public rowData: any;

    public checkIfArray: boolean;

    public isClick = false;

    @Output() public badgeClick = new EventEmitter();

    constructor(public cdRef: ChangeDetectorRef) { }

    public ngOnInit() {
        this.checkIfArray = Array.isArray(this.value);
    }
}
