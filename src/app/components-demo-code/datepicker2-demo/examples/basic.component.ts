import { Component } from '@angular/core';
import { Datepicker2Component } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [Datepicker2Component]
})

export class BasicComponent {
    // date = new Date('2019-09-01T23:00:00');
    date = undefined;

    minDate = new Date();
    maxDate: any;

    constructor() {
        const currentYear = new Date().getFullYear();
        this.minDate.setDate(this.minDate.getDate());
        this.maxDate = new Date(currentYear + 1, 11, 31);

        setTimeout(() => {
            this.date = new Date('2019-09-01T23:00:00');
            this.minDate = new Date(this.date.getFullYear() - 1, 11, 31);
        }, 2000);

        // setTimeout(() => {
        //     this.minDate = new Date(this.date.getFullYear() - 1, 11, 31);
        //     console.log(this.minDate);
        // }, 5000);
    }

    newDate(evt: any) {
        console.log(evt);
    }
}
