import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';

import { ToastDescriptionDirective } from './toast-description.directive';

@Component({
    selector: 'uno-toast',
    templateUrl: 'toast.component.html',
    styleUrls: ['toast.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToastComponent implements OnChanges {
    @Input() public type: 'success' | 'warning' | 'info' | 'error' = 'info';

    @Input() public title: string;

    @Input() public subTitle: string;

    @Input() public showAction: boolean;

    @Input() public actionTitle: string;

    @Output() public action = new EventEmitter();

    @Output() public close = new EventEmitter();

    public interval: Subscription;

    @ContentChild(ToastDescriptionDirective) public toastDescriptionDirective: ToastDescriptionDirective;

    constructor(private cdr: ChangeDetectorRef) { }

    public ngOnChanges() {
        if (this.type) {
            this.interval = interval(5000).subscribe(() => this.onClose());
        }
    }

    public ngOnDestroy() {
        if (this.interval) {
            this.interval.unsubscribe();
            this.close.emit();
        }
    }

    public onClose() {
        this.type = null;
        this.cdr.detectChanges();
        this.ngOnDestroy();
    }
}