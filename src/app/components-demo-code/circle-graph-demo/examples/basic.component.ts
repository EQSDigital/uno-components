import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CircleGraphComponent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [CircleGraphComponent, FormsModule]
})

export class BasicComponent {
    pickSelected = { color: '#3434d6' };

    levelType = { id: 1, siteId: 1, name: 'LEVEL III' };
    posLegX1 = 0.8;
    posLegY1 = 0.81;

    evaluated = 325;
    projected = 279;

    posLegX2 = 0.8;
    posLegY2 = 1.28;

    objectsSelected(objs: any[]) {
        console.log(objs);
    }

    onEvaluated(value: string) {
        console.log(value, 'evaluated');
    }

    onProjected(value: string) {
        console.log(value, 'projected');
    }
}
