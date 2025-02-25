import { Directive, OnInit, Input } from '@angular/core';

import { PillComponent } from './pill.component';
import { toBoolean } from '../../utils/util';

@Directive({
    selector: '[unoPillRemove]',
    standalone: true,
})
export class PillRemoveDirective implements OnInit {

    @Input() set unoPillRemovable(removable: any) {
        this.pill.removable = toBoolean(removable);
        this.pill.detector.markForCheck();
    }

    constructor(private pill: PillComponent) { }

    ngOnInit() {
        if (this.pill.removable === undefined) {
            this.pill.removable = true;
        }
    }
}
