import { Component } from '@angular/core';
import { BannerComponent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [BannerComponent]
})

export class BasicComponent {
    public onButtonClicked() {
        console.log('Button clicked');
    }
}
