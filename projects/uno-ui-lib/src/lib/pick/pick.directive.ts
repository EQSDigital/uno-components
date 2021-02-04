import { Directive, Input, Output, EventEmitter, AfterContentInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { toBoolean } from '../../util/util';

@Directive({selector: '[unoPick]' })

export class PickDirective implements AfterContentInit {

    selected: any;
    values = new BehaviorSubject(null);
    isMultiple = false;

    @Input('unoPick') set setSelected(selected: string) {
      this.selected = selected;
      this.ngAfterContentInit();
    }
    @Input() unoPickActiveClass: string;
    @Input('unoPickMultiple') set setIsMultiple(isMultiple: any) {
        this.isMultiple = toBoolean(isMultiple);
      }

    @Output() unoPickChange = new EventEmitter();
    @Output() unoOptionDestroyed = new EventEmitter();

    ngAfterContentInit() {
        this.values.next(this.selected);
    }

    selectOption(value: any) {
        let next: any;
        if (this.isMultiple) {
            if (Array.isArray(this.selected)) {
                // Remove if already there or add to selection
                const index = this.selected.findIndex(i => i.id === value.id);
                next = index > -1
                    ? [...this.selected.slice(0, index), ...this.selected.slice(index + 1)]
                    : [...this.selected, value];
            } else {
                next = Object.assign({}, this.selected, { [value]: !this.selected[value] });
            }
        } else {
            next = value;
        }

        this.unoPickChange.emit(next);
    }

    optionRemoved(value: any) {
        if (this.isMultiple && !this.selected) {
            return;
        }

        let emit: boolean;

        if (this.isMultiple) {
            emit = Array.isArray(this.selected) ? this.selected.indexOf(value) > -1 : !!this.selected[value];
        } else {
            emit = this.selected === value;
        }

        if (emit) {
            setTimeout(() => this.unoOptionDestroyed.emit(value));
        }
    }
}
