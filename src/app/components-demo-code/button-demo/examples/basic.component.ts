import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    buttonClick(evt) {
        console.log(evt.target, 'has been CLICKED!');
    }
}
