import { Component } from '@angular/core';
import { IconComponent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [IconComponent]
})

export class BasicComponent {
    getPlantString = 'plant';

    toggleIcon(iconStr: string) {
        this.getPlantString = this.getPlantString === 'plant' ? iconStr : 'plant';
    }
}
