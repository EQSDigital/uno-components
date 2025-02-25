import { Component, Renderer2 } from '@angular/core';

import { SearchComponent } from 'uno-ui-lib';


@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [SearchComponent]
})

export class BasicComponent {
    constructor(private render: Renderer2) { }

    onSearch(evt: string) {
        console.log(`Search term: ${evt}`);

        // this.render.setProperty(this.search.inputSearch.nativeElement, 'value', 'cenas muito maradas');
    }
}
