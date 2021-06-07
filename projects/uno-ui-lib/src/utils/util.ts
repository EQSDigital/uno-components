import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ElementRef, Renderer2 } from '@angular/core';
import { ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';

export const EMAIL_REGEX: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PHONE_REGEX: RegExp = /[0-9]{9}$/;

export const PHONE_REGEX_V2: RegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;

function propDecoratorFactory<T, D>(name: string, fallback: (v: T) => D): (target: any, propName: string) => void {
    function propDecorator(target: any, propName: string): void {
        const privatePropName = `$$__${propName}`;

        if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
            console.warn(`The prop "${privatePropName}" is already exists, it will be overrided by ${name} decorator.`)
        }

        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true
        });

        Object.defineProperty(target, propName, {
            get(): string {
                return this[privatePropName];
            },
            set(value: T): void {
                this[privatePropName] = fallback(value);
            }
        });
    }

    return propDecorator;
}

export function toBoolean(value: any): boolean {
    return coerceBooleanProperty(value);
}

export function InputBoolean(): any {
    return propDecoratorFactory('InputBoolean', toBoolean);
}

// Check if given value is integer. Cast strings as potential integers as well.
// See: http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
export function isInt(value: any): boolean {
    if (isNaN(value)) {
        return false;
    }

    const x = parseFloat(value);

    return (x | 0) === x;
}

// Similar to `lodash.isobject`
export function isObject(value: any): boolean {
    const type = typeof value;

    return !!value && (type === 'object' || type === 'function');
}

// Generate a unique id (unique within the entire client session).
// Useful for temporary DOM ids.
let idCounter = 0;
export function uniqueId(prefix = 'uid') {
    return `uno_${prefix}_${++idCounter}`;
}

export interface IReplaceClass {
    renderer: Renderer2;
    element: ElementRef;
}

export function replaceClass(instance: IReplaceClass, oldClass: string | string[], newClass?: string | string[]) {
    if (oldClass && oldClass !== newClass) {
        setClass(instance, oldClass, false);
    }

    if (newClass) {
        setClass(instance, newClass, true);
    }
}

function setClass(instance: IReplaceClass, klasses: string | string[], isAdd: boolean) {
    if (klasses) {
        (Array.isArray(klasses) ? klasses : [klasses]).forEach(k => {
            instance.renderer[isAdd ? 'addClass' : 'removeClass'](instance.element.nativeElement, k);
        });
    }
}

export const noWhitespaceValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    // CHECK IF FIRST AND LAST CHARACTER IS A EMPTY SPACE
    return control.value
        && (control.value as string).length > 0
        && ((control.value as string).indexOf(' ') === 0 || (control.value as string).lastIndexOf(' ') === (control.value as string).length - 1) ? { 'whitespace': true } : null;
}
