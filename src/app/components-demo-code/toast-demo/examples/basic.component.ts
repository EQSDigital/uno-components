import { Component } from '@angular/core';
import { ToastComponent, ButtonDirective } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [ToastComponent, ButtonDirective]
})

export class BasicComponent {
    public type: 'success' | 'warning' | 'info' | 'error';

    public title: string;

    public subTitle: string;

    public onClickButton(type: string) {
        switch (type) {
            case 'error':
                this.type = type;
                this.title = 'Error message';
                break;

            case 'warning':
                this.type = type;
                this.title = 'Warning message';
                break;

            case 'info':
                this.type = type;
                this.title = 'Information message';
                break;

            case 'success':
                this.type = type;
                this.title = 'Success message';
                break;
        }

        this.subTitle = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor \nLorem ipsum dolor sit amet, consectetur adipiscing elit`;
    }
}
