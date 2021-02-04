import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    date = new Date();

    constructor() { }

    goToAnchor(id: string) {
        const elem: HTMLElement = document.getElementById(id);
        const extraWalking = 500;

        if (elem) {
            window.scroll(
                { top: elem.offsetTop + extraWalking, behavior: 'smooth' }
            );
            // Blink it to draw attention:
            document.getElementById('datePickerExample').setAttribute('class', 'blink-me');
            // Turn it off:
            setTimeout(() => {
                document.getElementById('datePickerExample').removeAttribute('class');
            }, 7000);
        }
    }
}
