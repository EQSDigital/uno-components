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
    pickSelected = { color: '#3434d6' };
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

    openModalSmall = false;

    levelType = { id: 1, siteId: 1, name: 'Level III' };
    posLegX1 = 0.85;
    posLegY1 = 0.8;
    posEvaX = 0.95;
    posEvaY = 0.83;
    posEvaTitleX = 1;
    posEvaTitleY = 0.97;

    evaluated = 325;
    projected = 279;

    posLegX2 = 0.85;
    posLegY2 = 1.13;

    posProX = 0.95;
    posProY = 1.17;

    posProTX = 1;
    posProTY = 1.31;

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
