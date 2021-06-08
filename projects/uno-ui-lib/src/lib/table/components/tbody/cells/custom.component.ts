import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Row } from '../../../lib/data-set/row';
import { Grid } from '../../../lib/grid';

@Component({
    selector: 'ng2-st-tbody-custom',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *ngFor="let action of grid.getSetting('actions.custom')">

            <!-- This container will be repeated for ALL rows: -->
            <uno-icon
                [id]="action.icon"
                *ngIf="!action.rowProperty && action.visible"
                size="xx-small"
                [icon]="action.icon"
                class="slds-button__icon--left uno-smart-table-action uno-smart-table-action-custom-custom"
                [title]="action.title | translate"
                (click)="onCustom(action, $event)">
            </uno-icon>

            <!-- This container will be repeated ONLY on config property "rowProperty" passed in @ TableDemoComponent app: -->
            <uno-icon
                [id]="action.icon"
                *ngIf="row.data[action.rowProperty] && action.visible"
                size="xx-small"
                [icon]="action.icon"
                [color]="action.color || 'default'"
                class="slds-button__icon--left uno-smart-table-action uno-smart-table-action-custom-custom"
                [title]="action.title | translate"
                (click)="onCustom(action, $event)">
            </uno-icon>
        </ng-container>

        <uno-icon
            id="down"
            *ngIf="row.data?.downloadContentData"
            icon="down"
            size="xx-small"
            uno-popover-trigger

            unoPopoverPlacement="leftBottom"
            unoPopoverNubbin="right-top"
            unoPopoverSize="large"

            unoPopoverTemplate="downloadContent"
            [unoPopoverTemplateData]="row.data?.downloadContentData"

            uno-popover-click-behavior
            (unoPopoverTemplateEvent)="downloadInnerEventEmited($event)"

            class="slds-button__icon--left uno-smart-table-action uno-smart-table-action-custom-custom"
            title="Files to download">
        </uno-icon>
    `
})
export class TbodyCustomComponent {

    @Input() grid: Grid;
    @Input() row: Row;

    @Output() rowActionCustomEvent = new EventEmitter<any>();
    @Output() rowActionDownloadCustomEvent = new EventEmitter<any>();

    onCustom(action: any, event: any) {
        event.preventDefault();
        event.stopPropagation();

        this.rowActionCustomEvent.emit({
            action: action.name,
            title: action.title,
            data: this.row.data,
            source: this.grid.source,
            row: this.row
        });
    }

    downloadInnerEventEmited(objData: any) {
        Object.assign(objData, { row: this.row.data, source: this.grid.source });

        // Pass it back:
        this.rowActionDownloadCustomEvent.emit(objData);
    }

}
