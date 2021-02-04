import {
    Component, ChangeDetectionStrategy, HostBinding,
    ChangeDetectorRef, Input, Output, EventEmitter, ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'uno-pill',
    templateUrl: './pill.component.html',
    styleUrls: ['./pill.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class PillComponent {
    @Input() closeIcon = 'close';

    @Output() unoPillRemoveElem = new EventEmitter();

    @HostBinding('class.slds-pill') hasPill = true;

    removable: boolean;
    unlinked: boolean;

    constructor(public detector: ChangeDetectorRef) {
        this.unlinked = true;
    }

    remove() {
        this.unoPillRemoveElem.emit(null);
    }
}
