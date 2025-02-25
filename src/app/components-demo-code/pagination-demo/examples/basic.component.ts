import { Component } from '@angular/core';
import { PageEvent } from 'uno-ui-lib/lib/pagination/pagination.component';

import { FormsModule } from '@angular/forms';
import { PaginationComponent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [FormsModule, PaginationComponent]
})

export class BasicComponent {
    length = 100;
    pageSize = 10;
    pageIndex: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    pageEvent: PageEvent;

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        if (setPageSizeOptionsInput) {
            this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
        }
    }
}
