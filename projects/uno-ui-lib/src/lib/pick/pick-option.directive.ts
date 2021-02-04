import { Directive, Input, HostListener, HostBinding, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PickDirective } from './pick.directive';

@Directive({
    selector: '[uno-pick-option]',
    exportAs: 'unoPickOption',
    // host: {
    //     'role': 'button'
    // }

})

export class PickOptionDirective implements OnInit, OnDestroy {

    @HostBinding('attr.role') role = 'button';

    // Use a getter to prevent direct altering
    get active() {
        return this._active;
    }

    @Input('unoPickOption') set setValue(value: any) {
        this._value = value;
    }
    @Input() unoPickActiveClass: string;

    private _value: any;
    private _active = false;
    private _subscription: Subscription;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        public unoPick: PickDirective
    ) { }

    @HostListener('click')
    @HostListener('keydown.Space', ['$event'])
    @HostListener('keydown.Enter', ['$event'])
    pick(evt?: Event) {
        if (evt) {
            evt.preventDefault();
        }
        this.unoPick.selectOption(this._value);
    }

    ngOnInit() {
        this._subscription = this.unoPick.values.subscribe(
            value => {
                this._active = this._isActive(value);

                const activeClass = this.unoPickActiveClass || this.unoPick.unoPickActiveClass;
                if (activeClass) {
                    if (this.active) {
                        this.renderer.addClass(this.element.nativeElement, activeClass);
                    } else {
                        this.renderer.removeClass(this.element.nativeElement, activeClass);
                    }
                }
            }
        );
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
        this.unoPick.optionRemoved(this._value);
    }

    private _isActive(value: any) {
        if (this.unoPick.isMultiple) {
            if (!value) { return false; }
            return Array.isArray(value) ? value.indexOf(this._value) > -1 : !!value[this._value];
        } else {
            return this._value === value;
        }
    }
}

