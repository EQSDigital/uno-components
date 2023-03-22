import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    date = new Date('2019-09-01T23:00:00');

    minDate = new Date();
    maxDate: any;

    constructor() {
        const currentYear = new Date().getFullYear();
        this.minDate.setDate(this.minDate.getDate());
        this.maxDate = new Date(currentYear + 1, 11, 31);

        setTimeout(() => {
            this.minDate = new Date(this.date.getFullYear() - 1, 11, 31);
            console.log(this.minDate);
        }, 5000);
    }

    newDate(evt: any) {
        console.log(evt);
    }
}
