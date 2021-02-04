import { Component } from '@angular/core';
import { PageEvent } from 'uno-ui-lib/lib/pagination/pagination.component';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
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
