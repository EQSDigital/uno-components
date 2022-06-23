import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    styleUrls: ['../tag-input-demo.component.scss']
})

export class BasicComponent {
    allSkills = [
        { id: 1, name: 'Angular' },
        { id: 2, name: 'Css' },
        { id: 3, name: 'Javascript' },
        { id: 4, name: 'HTML' },
        { id: 5, name: 'Ember' },
        { id: 6, name: 'Vue' },
        { id: 7, name: 'React' },
        { id: 8, name: 'Redux' },
        { id: 9, name: 'Rails' },
        { id: 10, name: 'Ruby' },
        { id: 11, name: 'Python' },
        { id: 12, name: 'Python 2' },
        { id: 13, name: 'Python 3' },
        { id: 14, name: 'Python 4' },
        { id: 15, name: 'NodeJS' },
        { id: 16, name: 'Meteor' },
    ];

    pickSelected1 =
        { value: 'Value extra 5', id: 5 };


    mySkills = [
        { id: 1, name: 'Angular' },
        { id: 2, name: 'Css' },
        { id: 8, name: 'Redux' },
        { id: 9, name: 'Rails' }
    ];

    openModalSmall = false;

    objectsSelected(objs: any[]) {
        console.log(objs);
    }

    onEvaluated(value: string) {
        console.log(value, 'evaluated');
    }

    onProjected(value: string) {
        console.log(value, 'projected');
    }

    optionSelected(evt) {
        console.log(evt, 'color');
    }
}
