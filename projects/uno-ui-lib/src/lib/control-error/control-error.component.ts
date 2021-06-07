import { Component, ChangeDetectorRef, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    templateUrl: 'control-error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `.hide {
            display: none
        }`
    ]
})

export class ControlErrorComponent {
    public _useOurValidation: boolean;
    public _text: string;
    public _hide: boolean = true;

    @Input() set text(value: string) {
        if (value !== this._text) {
            this._text = value;
            this._hide = !value;
            this.cdr.detectChanges();
        }
    }

    @Input() set useOurValidation(value: boolean) {
        if (value !== this._useOurValidation) {
            this._useOurValidation = value;
            this.cdr.detectChanges();
        }
    }

    constructor(private cdr: ChangeDetectorRef) { }
}
