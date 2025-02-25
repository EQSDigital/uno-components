import { Component, ChangeDetectionStrategy, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { BadgeComponent } from 'uno-ui-lib';


@Component({
    template: `
        <div (click)="badgeClick.emit()" [style.cursor]="isClick ? 'pointer' : 'default'">
          @switch (checkIfArray) {
            @case (false) {
              <uno-badge bgColor="dusk" txtColor="white">{{ value || 0 }}</uno-badge>
            }
            @case (true) {
              <uno-badge bgColor="dusk" txtColor="white">{{ rowData[objectToLength].length }}</uno-badge>
            }
          }
        </div>
        `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [BadgeComponent]
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
