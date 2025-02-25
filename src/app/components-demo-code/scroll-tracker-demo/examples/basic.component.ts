import { Component } from '@angular/core';
import { ScrollTrackerDirective } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [ScrollTrackerDirective]
})

export class BasicComponent {
    scrollPosition: number;
    paintInRed: boolean;

    scrollEvent(evt) {
        console.log('scroll pos: ', evt.pos);
        this.scrollPosition = evt.pos;
        this.paintInRed = false;

        if (evt.endReached) {
            this.paintInRed = true;
            console.error('Scroll end reached!', evt);
        }
    }
}
