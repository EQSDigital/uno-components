import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    pickSelected = { color: '#3434d6' };

    open2: any;

    items = [
        { color: '#3434d6' },
        { color: '#1825aa' },
        { color: '#1990f9' },
        { color: '#89e6fe' },
        { color: '#ff5100' },
        { color: '#ff2200' },
        { color: '#f3ab4b' },
        { color: '#fcd719' },
        { color: '#77dc01' },
        { color: '#50e3c2' },
        { color: '#239688' },
        { color: '#617d8b' },
        { color: '#acb8c3' },
        { color: '#795548' },
        { color: '#9f5dba' },
        { color: '#9900ef' },
        { color: '#9682e7' },
        { color: '#6d79f6' },
        { color: '#f78ea7' }];

    optionSelected(evt) {
        console.log(evt, 'color');
    }
}
