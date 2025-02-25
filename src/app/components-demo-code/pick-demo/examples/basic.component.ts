import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PickDirective, ButtonDirective, PickOptionDirective } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [PickDirective, PickOptionDirective, ButtonDirective, JsonPipe]
})

export class BasicComponent implements OnInit {
    // Init selection var:
    selected = 'middle';

    // Init multiple option OBJ selection::
    multipleObject = {
        left: true,
        middle: true,
    };
    arrayTrues = [];

    ngOnInit() {
        this.countTrues();
    }

    countTrues() {
        this.arrayTrues = [];
        Object.keys(this.multipleObject).forEach(
            (key, idx) => {
                if (this.multipleObject[key] === true) {
                    this.arrayTrues.push(key);
                }
            }
        );

    }

    newPickEvent(evt) {
        this.countTrues();
        console.log('New pick was done: ', evt);
        console.warn('We know have selected: ', this.arrayTrues);
    }
}
