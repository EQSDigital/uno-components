import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'uno-banner',
    templateUrl: 'banner.component.html',
    styleUrls: ['banner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BannerComponent {
    @Input() public type: 'success' | 'warning' | 'info' | 'error' = 'info';

    @Input() public title: string;

    @Input() public subTitle: string;

    @Input() public showAction: boolean;

    @Input() public actionTitle: string;

    @Output() public action = new EventEmitter();

    public onClickAction() {
        this.action.emit();
    }
}