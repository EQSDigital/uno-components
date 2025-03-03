import { Component } from '@angular/core';

import { DropdownDirective, IconComponent, DateDayComponent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [DropdownDirective, IconComponent, DateDayComponent]
})

export class BasicComponent {
    weeks: { day: number }[][] = [
        [
            { day: 30 }, { day: 31 }, { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }
        ],
        [
            { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }
        ],
        [
            { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }
        ],
        [
            { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }
        ]
    ];

    setOfDays = this.setOfSeqNumbers(1, 31);

    disabledDays = [30, 31, 15];

    openDropdown: boolean;
    daySelected: number | string;

    constructor() { }

    setOfSeqNumbers(start: number, end: number) {
        const nRange = (end + 1) - start;
        const newArray = new Array(nRange).fill(start);
        const generatedSet = newArray.map((d, i) => i + start);

        return generatedSet;
    }
}
