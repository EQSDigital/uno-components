import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    weeks = [
        [
            { day: 30 }, { day: 31 }, { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }
        ],
        [
            { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }
        ],
        [
            { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: '...' }
        ]
    ];

    setOfDays = this.setOfSeqNumbers(1, 31);

    disabledDays = [30, 31, 15];

    openDropdown: boolean;
    daySelected: number;

    constructor() { }

    setOfSeqNumbers(start: number, end: number) {
        const nRange = (end + 1) - start;
        const newArray = new Array(nRange).fill(start);
        const generatedSet = newArray.map((d, i) => i + start);

        return generatedSet;
    }
}
