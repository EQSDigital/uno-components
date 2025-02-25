import { Component } from '@angular/core';
import { BadgeComponent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [BadgeComponent]
})

export class BasicComponent {
}