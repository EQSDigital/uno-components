import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    onSearch(evt: string) {
        console.log(`Search term: ${evt}`);
    }
}
