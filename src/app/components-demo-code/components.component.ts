import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    templateUrl: './components.component.html',
    standalone: true,
    imports: [RouterOutlet]
})
export class ComponentsComponent { }