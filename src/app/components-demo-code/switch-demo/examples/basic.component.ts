import { Component } from '@angular/core';
import { SwitchComponent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [SwitchComponent]
})

export class BasicComponent {
    onClickChanges(evt) {
        console.log('Switch clicked to "' + evt + '"!');
    }
}
