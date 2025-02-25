import { Component, ChangeDetectionStrategy, HostBinding, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { TranslateDirective } from '@ngx-translate/core';

import { uniqueId } from '../../utils/util';
import { DateDayComponent } from '../date-day/date-day.component';
import { DateWeekdaysComponent } from '../date-weekdays/date-weekdays.component';
import { DateYearComponent } from '../date-year/date-year.component';
import { ButtonDirective } from '../button/button.directive';
import { BadgeComponent } from '../badge/badge.component';
import { IconComponent } from '../icon/icon.component';

export interface NanoInternalDate {
    year: number;
    month: number;
    day: number;
    disabled?: boolean;
}

@Component({
    selector: 'uno-datepicker',
    templateUrl: './datepicker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IconComponent, BadgeComponent, ButtonDirective, TranslateDirective, DateYearComponent, DateWeekdaysComponent, DateDayComponent]
})
export class DatepickerComponent {

    @HostBinding('attr.aria-hidden') areaHidden = 'false';
    @HostBinding('class.slds-datepicker') datePicker = 'true';
    @HostBinding('attr.tabindex') tabIndex = '0';

    date: NanoInternalDate;
    current: NanoInternalDate;
    weeks: NanoInternalDate[][];
    uid = uniqueId('datepicker');
    monthLabel: string;

    @Input() monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'];
    @Input() dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    @Input() dayNamesLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursda', 'Friday', 'Saturday'];

    // How many years before and after the current one are selectable in dropdown <uno-date-year />?
    @Input() numYearsBefore = 100;
    @Input() numYearsAfter = 10;

    @Input('date') set _date(date: Date) {
        this.date = this.parseDate(date);

        if (this.date) {
            this.current = { ...this.date };
        }

        this.render();
    }

    @Input() todayButton = true;

    firstDayOfWeek = 0;
    @Input('firstDayOfWeek') set _firstDayOfWeek(firstDayOfWeek: number) {
        this.firstDayOfWeek = +firstDayOfWeek;
        this.render();
    }

    @Output() dateChange = new EventEmitter();


    // KEYBORD CONTROL (events):
    // ============================================================

    @HostListener('keydown.Enter', ['$event'])
    enterEvt(event: KeyboardEvent) { this.keyboardHandler(event, 'Enter'); }

    // ============================================================

    @HostListener('keydown.ArrowUp', ['$event'])
    arrowUpEvt(event: KeyboardEvent) { this.keyboardHandler(event, 'MoveDay', -7); /* Decreases 7 days => goes UP 1 line!*/ }

    @HostListener('keydown.ArrowLeft', ['$event'])
    arrowLeftEvt(event: KeyboardEvent) { this.keyboardHandler(event, 'MoveDay', -1); }

    @HostListener('keydown.ArrowRight', ['$event'])
    arrowRightEvt(event: KeyboardEvent) { this.keyboardHandler(event, 'MoveDay', 1); }

    @HostListener('keydown.ArrowDown', ['$event'])
    arrowDownEvt(event: KeyboardEvent) { this.keyboardHandler(event, 'MoveDay', 7); /* Increments 7 days => goes DOWN 1 line!*/ }

    // ============================================================

    @HostListener('keydown.PageUp', ['$event'])
    pageUpEvt(event: KeyboardEvent) { this.keyboardHandler(event, 'MoveMonth', -1); }

    @HostListener('keydown.PageDown', ['$event'])
    pageDownEvt(event: KeyboardEvent) { this.keyboardHandler(event, 'MoveMonth', 1); }

    @HostListener('keydown.Home', ['$event'])
    homeEvt(event: KeyboardEvent) { this.keyboardHandler(event, 'MoveDayTo', 1); }

    @HostListener('keydown.End', ['$event'])
    endEvt(event: KeyboardEvent) { this.keyboardHandler(event, 'MoveDayTo', 31); }

    // ============================================================

    keyboardHandler($event: KeyboardEvent, code: string, param?: number | string) {
        if ($event) {
            // Stop bubbling, for other than @HostListener:
            $event.preventDefault();
            $event.stopPropagation();
        }
        // On any keybord event we, most probably, will change current date (aparte from "Enter")
        const { year, month, day } = this.current;
        const date = new Date(year, month, day, 12);

        switch (code) {
            case 'Enter':
                this.select();
                break;

            case 'MoveDay':
                date.setDate(day + (+param));
                this.current = { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
                this.render();
                break;

            case 'MoveMonth': {
                const aux: NanoInternalDate = this.date || this.parseDate(new Date());
                // ONLY MOVE PREVIOUS IF CURRENT DATE IS MORE GREATER OR EQUAL TO NUMBER OF YEARS BEFORE
                if (param === -1 && new Date(this.current.year, this.current.month, this.current.day) <= new Date(aux.year - this.numYearsBefore, aux.month, aux.day)) { return; }
                // ONLY MOVE NEXT IF CURRENT DATE IS LESS GREATER OR EQUAL TO NUMBER OF YEARS AFTER
                if (param === 1 && new Date(this.current.year, this.current.month, this.current.day) >= new Date(aux.year + this.numYearsAfter, aux.month, aux.day)) { return; }

                date.setMonth(month + (+param), 1);
                this.current = { year: date.getFullYear(), month: date.getMonth(), day };
                this.render();
                break;
            }

            case 'MoveDayTo':
                this.current.day = +param;
                this.render();
                break;

            default:
                break;
        }
    }

    // ========================
    // Methods:
    // ========================
    isSelected(date: NanoInternalDate) {
        return this.isEqualDate(date, this.date);
    }

    isActive(date: NanoInternalDate) {
        return this.isEqualDate(date, this.current);
    }

    select(date: NanoInternalDate = this.current) {
        if (date.disabled) { return; }
        const { year, month, day } = date;
        this.dateChange.emit(new Date(year, month, day));
    }

    selectToday() {
        this.dateChange.emit(new Date());
    }

    moveYear(year: number) {
        this.current.year = +year;
        this.render();
    }

    // ========================
    // AUX functions:
    // ========================
    indexTrackBy(index: number) { return index; }

    parseDate(date: Date): NanoInternalDate {
        if (!date) { return null; }

        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate()
        };
    }

    isEqualDate(d1: NanoInternalDate, d2: NanoInternalDate) {
        return d1 && d2 && d1.day === d2.day && d1.month === d2.month && d1.year === d2.year;
    }

    render() {
        if (!this.current) {
            this.current = this.today;
        }

        const { year, month, day } = this.current;
        const days = this.daysInMonth(year, month);
        const nextMonth = this.daysInNextMonth(year, month + 1, days.length);

        this.monthLabel = this.monthNames[month];
        // Keep current day inside limits of this month
        this.current.day = Math.min(day, days.length);
        // Switch between month's days, on navigation:
        Array.prototype.unshift.apply(days, this.daysInPreviousMonth(year, month));

        if (nextMonth) {
            Array.prototype.push.apply(days, nextMonth);
        }

        // ... and week's 7 days:
        this.weeks = this.splitDays(days, 7);
    }

    daysInMonth(year: number, month: number) {
        const last = new Date(year, month + 1, 0).getDate();
        return this.getDayObjects(year, month, 1, last);
    }

    daysInPreviousMonth(year: number, month: number) {
        const firstIndex = (new Date(year, month, 1)).getDay();
        const last = new Date(year, month, 0).getDate();
        const numDays = (7 + firstIndex - this.firstDayOfWeek) % 7;

        return this.getDayObjects(year, month - 1, last - numDays + 1, last, true);
    }

    daysInNextMonth(year: number, month: number, numOfDays: number) {
        if (numOfDays % 7 === 0) {
            return;
        }

        return this.getDayObjects(year, month, 1, 7 - (numOfDays % 7), true);
    }

    getDayObjects(year: number, month: number, from: number, to: number, disabled = false) {
        const days: NanoInternalDate[] = [];
        for (let day = from; day <= to; day++) {
            // ONLY CAN SELECT THE DAY FROM TODAY LESS numYearBefore
            let date: NanoInternalDate;
            if (!this.date || this.numYearsBefore === 0) {
                date = this.parseDate(new Date());
            } else {
                date = this.date;
            }

            if (new Date(year, month, day) < new Date(date.year - this.numYearsBefore, date.month, date.day)) {
                days.push({ year, month, day, disabled: true });
            } else {
                days.push({ year, month, day, disabled });
            }
        }

        return days;
    }

    get today() {
        const today = new Date();
        return { year: today.getFullYear(), month: today.getMonth(), day: today.getDate() };
    }

    // Split array into "size" elements arrays
    splitDays = (arr: any[], size: number) => {
        const arrays: any[] = [];

        while (arr.length > 0) {
            arrays.push(arr.splice(0, size));
        }

        return arrays;
    }
}
