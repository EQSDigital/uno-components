import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
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

        this.subTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor';
    }
}
