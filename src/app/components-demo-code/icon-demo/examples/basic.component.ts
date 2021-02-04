import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    getPlantString = 'plant';

    toggleIcon(iconStr: string) {
        this.getPlantString = this.getPlantString === 'plant' ? iconStr : 'plant';
    }
}
