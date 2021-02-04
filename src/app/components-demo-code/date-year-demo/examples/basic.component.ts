import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    styleUrls: ['../date-year-demo.component.css']
})

export class BasicComponent {
    chosenYear: number;

    constructor() { }

    moveYear(year: string | number) {
        this.chosenYear = +Number(year);
    }
}
