import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    onClickChanges(evt) {
        console.log('Switch clicked to "' + evt + '"!');
    }
}
