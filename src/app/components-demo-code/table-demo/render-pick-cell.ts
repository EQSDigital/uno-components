import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { PicklistComponent, PickDirective } from 'uno-ui-lib';

@Component({
    template: `
    <div [style.cursor]="'default'" (click)="edit = true; clicked.emit(rowData); $event.stopPropagation()">
      @if (!edit) {
        <div class="slds-align-middle color" [style.background-color]="value?.color"></div>
        <span class="slds-truncate slds-align-middle">{{ value?.name }}</span>
      }
      @if (edit) {
        <uno-picklist
          [data]="dropDown"
          [(open)]="openDropdown"
          (selectedElem)="optionPicked($event)"
          uno-pick
          [(unoPick)]="pick">
          <div class="slds-align-middle color" [style.background-color]="pick?.color || value?.color"></div>
          <span class="slds-truncate slds-align-middle">{{ pick?.name || value?.name || 'Select an item' }}</span>
          <ng-template uno-picklist-item let-item>
            <div class="slds-align-middle color" [style.background-color]="item.color"></div>
            <span class="slds-truncate slds-align-middle">{{ item.name }}</span>
          </ng-template>
        </uno-picklist>
      }
    
    </div>
    `,
    styles: [`
        .color {
            display: inline-block;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            margin-right: 5px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PicklistComponent, PickDirective]
})
export class RenderPickColumnComponent {

    public dropDown = [
        { id: 1, name: 'Admin', color: 'green' },
        { id: 2, name: 'Read Only', color: 'yellow' },
        { id: 3, name: 'Guest', color: 'red' },
    ];

    public rowData: any;

    public edit = false;

    public value: any;

    public openDropdown: any;

    public pick: any;

    @Output() public change = new EventEmitter();
    @Output() public clicked = new EventEmitter();

    public optionPicked(evt: any) {
        this.change.emit({ status: this.dropDown[evt.idx], data: this.rowData });
    }
}
