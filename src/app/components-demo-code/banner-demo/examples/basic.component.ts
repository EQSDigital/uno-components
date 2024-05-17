import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    public onButtonClicked() {
        console.log('Button clicked');
    }
}
