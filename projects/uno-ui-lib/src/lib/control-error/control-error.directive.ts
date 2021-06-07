import { Directive, ViewContainerRef, ComponentFactoryResolver, Optional, OnInit, OnDestroy, ComponentRef, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { ControlErrorComponent } from './control-error.component';
import { PHONE_REGEX, PHONE_REGEX_V2, EMAIL_REGEX } from '../../utils/util';
import { ControlErrorContainerDirective } from './control-error-container.directive';

// https://netbasal.com/make-your-angular-forms-error-messages-magically-appear-1e32350b7fa5

@Directive({
    selector: '[formControl], [formControlName]'
})
export class ControlErrorDirective implements OnInit, OnDestroy {
    @Input() public customErrors = {};
    @Input() public useOurValidation: boolean = true;

    private ref: ComponentRef<ControlErrorComponent>;
    private container: ViewContainerRef;
    private subscription$: Subscription = new Subscription();

    constructor(
        public vcr: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        @Optional() controlErrorContainer: ControlErrorContainerDirective,
        private controlDir: NgControl,
        private translate: TranslateService
    ) {
        this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    }

    public ngOnInit() {
        this.subscription$.add(
            this.control.valueChanges
                .subscribe((v) => {
                    const controlErrors = this.control.errors;
                    if (controlErrors) {
                        const firstKey = Object.keys(controlErrors)[0];
                        const text = this.customErrors[firstKey] || this.getError(firstKey, controlErrors);
                        this.setError(text);
                    } else if (this.ref) {
                        this.setError(null);
                    }
                })
        );
    }

    public ngOnDestroy() {
        this.subscription$.unsubscribe();
    }

    private get control() {
        return this.controlDir.control;
    }

    private setError(text: string) {
        if (!this.ref) {
            const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
            this.ref = this.container.createComponent(factory);
        }

        this.ref.instance.text = text;
        this.ref.instance.useOurValidation = this.useOurValidation;
    }

    private getError(firstKey: string, controlErrors: any): string {
        switch (firstKey) {
            case 'required':
                return this.translate.instant('requiredField');
            case 'min':
                return `Min. ${controlErrors[firstKey].min}`;
            case 'minlength':
                return `${this.translate.instant('expect')} ${controlErrors[firstKey].requiredLength} ${this.translate.instant('butGot')} ${controlErrors[firstKey].actualLength}`;
            case 'max':
                return `Max. ${controlErrors[firstKey].max}`;
            case 'maxlength':
                return this.translate.instant('maxLengthField');
            case 'pattern':
                const regex = controlErrors[firstKey].requiredPattern.slice(1, controlErrors[firstKey].requiredPattern.length - 1);
                switch (regex) {
                    case PHONE_REGEX.source.toString():
                        return this.translate.instant('phoneField');
                    case PHONE_REGEX_V2.source.toString():
                        return 'Ex: +351 912345678'; // 'Use +(ind) number'
                    case EMAIL_REGEX.source.toString():
                        return this.translate.instant('emailField');
                    default: return this.translate.instant(`invalidField`);
                }
            default:
                return this.translate.instant('invalidField');
        }
    }
}
