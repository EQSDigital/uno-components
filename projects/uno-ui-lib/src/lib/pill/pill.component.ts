import {
    Component, ChangeDetectionStrategy, HostBinding,
    ChangeDetectorRef, Input, Output, EventEmitter, ViewEncapsulation
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';


@Component({
    selector: 'uno-pill',
    templateUrl: './pill.component.html',
    styleUrls: ['./pill.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [IconComponent]
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
