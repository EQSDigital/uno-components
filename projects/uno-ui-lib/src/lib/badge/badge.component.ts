import { Component, OnChanges, AfterViewInit, ChangeDetectionStrategy, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'uno-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent implements OnChanges, AfterViewInit {

    // Define color/type of badge:
    //  default
    //  info
    //  success
    //  warning
    //  error

    //  shade
    //  inverse
    @Input() type: string;

    // Define if mouse hovering is pointer:
    @Input() pointer: boolean;

    // Set the max character size of the content:
    @Input() maxContentSize = 0;

    // Allow to set custom bgColor/txtColor:
    @Input() bgColor: string;
    @Input() txtColor: string;
    // ... into our component's "customStyle" object, to be HTML applied:
    customStyle = {};

    constructor(public badgeComponent: ElementRef) { }

     // About color/backgorund-color CSS independent costumization: before DOM ready (being injected through HTML's NG "customStyle" var)
    ngOnChanges() {
        if (this.bgColor) {
            this.customStyle['background-color'] = `var(--${this.bgColor})`;
        }

        if (this.txtColor) {
            this.customStyle['color'] = `var(--${this.txtColor})`;
        }
    }

    // About max length of badge: DOM needs to be settled so it can be measured
    ngAfterViewInit() {
        const badge: HTMLElement = this.badgeComponent.nativeElement;

        if (this.maxContentSize > 0) {
            const badgeSpan = badge.children[0];
            const badgeText = badge.textContent;

            if (badgeText.length > this.maxContentSize) {
                // Ellipsis the content:
                badgeSpan.textContent = `${badgeText.slice(0, this.maxContentSize)}...`;
                // Show full content on "title" attribute
                badge.setAttribute('title', badgeText);
            }
        }
    }
}
