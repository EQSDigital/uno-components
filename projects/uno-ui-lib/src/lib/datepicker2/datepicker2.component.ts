import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, HostListener, SimpleChanges } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDateFormats } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

export const MY_FORMATS: MatDateFormats = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
    selector: 'uno-datepicker2',
    templateUrl: './datepicker2.component.html',
    styleUrls: ['./datepicker2.component.scss'],
    providers: [
        // The locale would typically be provided on the root module of your application. We do it at
        // the component level here, due to limitations of our example generation script.
        { provide: MAT_DATE_LOCALE, useValue: 'pt-PT' },

        // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
        // `MatMomentDateModule` in your applications root module. We provide it at the component level
        // here, due to limitations of our example generation script.
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Datepicker2Component implements OnChanges {

    // Label for the placeholder
    @Input() chooseLabel = 'Choose a date';

    // Variable to disable the datepicker
    @Input() disable = false;
    // Variable to add the required validation to the form
    @Input() required = false;
    // Variable to disable the click on the calendar
    @Input() disableCalendar = false;
    // Variable to hide erro message on when table edit in line
    @Input() hideError = false;

    // Current date selected
    @Input() date: Date;

    // Min and Max years for the datepicker
    @Input() min: number;
    @Input() max: number;

    @Input() reset: false;

    // Emitter to detect changes on the date
    @Output() dateChange = new EventEmitter();

    dateForm = new FormControl('');

    @HostListener('document:click', ['$event'])
    clickout(event: any) {
        const cells = Array.from(document.querySelectorAll<HTMLDivElement>('.mat-calendar .mat-calendar-table-header tr th'));
        cells.forEach((c) => {
            c.innerText = c.innerText === '2ª' ? 'S' : c.innerText;
            c.innerText = c.innerText === '3ª' ? 'T' : c.innerText;
            c.innerText = c.innerText === '4ª' ? 'Q' : c.innerText;
            c.innerText = c.innerText === '5ª' ? 'Q' : c.innerText;
            c.innerText = c.innerText === '6ª' ? 'S' : c.innerText;
            c.innerText = c.innerText === 'Sá' ? 'S' : c.innerText;
            c.innerText = c.innerText === 'Do' ? 'D' : c.innerText;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.disable && this.disable) {
            this.dateForm.disable();
        }

        if (changes.disable && !this.disable) {
            this.dateForm.enable();
        }

        if (changes.required && this.required) {
            this.dateForm.setValidators(Validators.required);
        }

        if (changes.date && changes.date.currentValue) {
            this.dateForm.reset();
            this.dateForm.setValue(this.date);
        }

        if (changes.reset && this.reset) {
            this.dateForm.setValue(null);
        }
    }

    /**
     * Method to detect changes on the datepicker
     * @param type - Event type, input or calendar
     * @param event - new date
     */
    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        // When the form is valid emit a the date selected or written
        if (this.dateForm.valid && event.value) {
            const d = new Date(event.value);
            this.dateChange.emit(d);
        } else if (!event.value) {
            // when the date is delete emit a null
            this.dateChange.emit(null);
        } else {
            // When the form is invalid emit astring telling is invalid date
            this.dateChange.emit('invalid');
        }
    }

    dtpOpened() {
        setTimeout(() => {
            const cells = Array.from(document.querySelectorAll<HTMLDivElement>('.mat-calendar .mat-calendar-table-header tr th'));
            cells.forEach((c) => {
                c.innerText = c.innerText === '2ª' ? 'S' : c.innerText;
                c.innerText = c.innerText === '3ª' ? 'T' : c.innerText;
                c.innerText = c.innerText === '4ª' ? 'Q' : c.innerText;
                c.innerText = c.innerText === '5ª' ? 'Q' : c.innerText;
                c.innerText = c.innerText === '6ª' ? 'S' : c.innerText;
                c.innerText = c.innerText === 'Sá' ? 'S' : c.innerText;
                c.innerText = c.innerText === 'Do' ? 'D' : c.innerText;
            });

        });
    }

    markAsDirty() {
        this.dateForm.markAsDirty();
    }
}
