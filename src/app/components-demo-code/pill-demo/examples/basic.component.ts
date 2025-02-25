import { Component, OnInit } from '@angular/core';

import { PillComponent, IconComponent, ButtonDirective } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [PillComponent, IconComponent, ButtonDirective]
})

export class BasicComponent implements OnInit {
    pills: any[] = [];

    private pillCounter = 1;

    ngOnInit() {
        for (let x = 5; x > 0; x--) {
            this.add();
        }
    }

    add() {
        this.pills.push(`Pill #${this.pillCounter++} !`);
    }

    remove(pill: string) {
        this.pills = this.pills.filter(_pill => _pill !== pill);
    }
}
