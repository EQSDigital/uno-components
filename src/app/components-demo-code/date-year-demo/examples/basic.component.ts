import { Component } from '@angular/core';
import { DateYearComponent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    styleUrls: ['../date-year-demo.component.css'],
    standalone: true,
    imports: [DateYearComponent]
})

export class BasicComponent {
    chosenYear: number;

    constructor() { }

    moveYear(year: string | number) {
        this.chosenYear = +Number(year);
    }
}
