import { Component } from '@angular/core';
import { ButtonDirective, IconComponent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [ButtonDirective, IconComponent]
})

export class BasicComponent {
    buttonClick(evt) {
        console.log(evt.target, 'has been CLICKED!');
    }
}
