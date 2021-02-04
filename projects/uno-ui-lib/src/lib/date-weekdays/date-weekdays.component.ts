import { Component, Input, ChangeDetectionStrategy, OnInit, OnChanges } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'tr[uno-date-weekdays]',
    template: `
        <th *ngFor="let day of weekdays" [id]="day.id" scope="col">
            <uno-badge [title]="'day.title' | translate" tranlate>{{ day.label }}</uno-badge>
        </th>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateWeekdaysComponent implements OnInit, OnChanges {

    weekdays: any[] = [];

    @Input() firstDayOfWeek = 0;    // i.e. '3' => 'Wed' will be the 1st week's day to be rendered.
    @Input() dayNamesShort: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    @Input() dayNamesLong: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    constructor() { }

    ngOnInit() {
        this.renderCalendar();
    }

    ngOnChanges() {
        this.renderCalendar();
    }

    renderCalendar() {
        this.weekdays = [];
        for (let i = 0; i < 7; i++) {
            const offset = (this.firstDayOfWeek + i) % 7;

            this.weekdays.push(
                {
                    id: `weekday-${i}`,
                    label: this.dayNamesShort[offset],
                    title: this.dayNamesLong[offset]
                }
            );
        }
    }
}
