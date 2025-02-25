import { Component } from '@angular/core';
import { BasicComponent } from './examples/basic.component';
import { ComponentLayoutComponent } from '../../component-layout/component-layout.component';

@Component({
    selector: 'app-picture-demo',
    templateUrl: 'picture-demo.component.html',
    standalone: true,
    imports: [ComponentLayoutComponent, BasicComponent]
})

export class PictureDemoComponent {}

