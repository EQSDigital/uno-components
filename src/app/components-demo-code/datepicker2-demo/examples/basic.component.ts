import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    date = new Date();

    minDate = new Date();
    maxDate = new Date();

    constructor() {
        const currentYear = new Date().getFullYear();
        this.minDate.setDate(this.minDate.getDate());
        this.maxDate = new Date(currentYear + 1, 11, 31);
    }

    newDate(evt: any) {
        console.log(evt);
    }
}
