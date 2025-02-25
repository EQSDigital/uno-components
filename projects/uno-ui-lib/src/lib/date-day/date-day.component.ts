import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'td[uno-date-day]',
    template: ` <span class="slds-day">{{ label }}</span>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class DateDayComponent {

    openDropdown: boolean;

    @HostBinding('attr.role') role = 'gridcell';

    @Input() day: string | number;

    @HostBinding('class.slds-disabled-text')
    @HostBinding('attr.aria-disabled')
    @Input() dayDisabled: boolean;

    @HostBinding('class.slds-is-selected')
    @HostBinding('attr.aria-selected')
    @Input() daySelected: boolean;

    get label() {
        return Number(this.day) < 10 ? `0${this.day}` : this.day;
    }
}
