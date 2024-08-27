import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'uno-date-year',
    template: `
        <div class="uno-dropdown-container">

            <span unoDropdown [(open)]="openDropdown">

                <button unoDropdownTrigger (click)="goToYear()" class="slds-button slds-button--neutral">
                    <span class="slds-truncate">{{ year }}</span>
                    <uno-icon icon="down_s" size="x-small" class="slds-m-left_small slds-float--right"></uno-icon>
                </button>

                <div class="slds-dropdown slds-dropdown--left">
                    <ul #ulList class="dropdown__list" role="menu">
                        <li *ngFor="let eachYear of range" [id]="eachYear" class="slds-dropdown__item">
                            <a unoDropdownItem role="menuitem" (click)="year = eachYear; yearChange.emit(year)">
                                <p class="slds-truncate">{{ eachYear }}</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </span>
        </div>
    `,
    styles: [`
        div.uno-dropdown-container { width: 96px; }
        div.uno-dropdown-container > span:first-child { width: 100%; }
        div.uno-dropdown-container > span:first-child > button { width: 100%; text-align: left; }

        ul.dropdown__list { max-height: 200px; overflow: auto; }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class DateYearComponent implements OnInit {

    openDropdown = false;
    currentYear = (new Date()).getFullYear();

    @Input() numYearsBefore = 100;
    @Input() numYearsAfter = 10;

    year: number;
    @Input('year') set setYear(year: string | number) {
        this.year = +Number(year);
    }

    @Output() yearChange = new EventEmitter();

    get range(): number[] {
        const firstYear = Math.min(this.currentYear - this.numYearsBefore, this.year);
        const size = Math.max(this.currentYear + this.numYearsAfter, this.year) - firstYear;
        const range = Array.apply(null, { length: size + 1 }).map((value: any, index: number) => firstYear + index);
        range.reverse();
        return range;
    }

    @ViewChild('ulList') private ulList: ElementRef;

    constructor() { }

    ngOnInit() {
        // By default, if none is passed in, the selecor renders with current year:
        this.year = this.currentYear;
    }

    goToYear() {
        // Because the <ul> it's not rendered on the DOM it's need wait that <ul> is ready.
        setTimeout(() => {
            if (this.openDropdown) {
                const elem = (this.ulList.nativeElement as Element).children.namedItem(String(this.year));
                const topOfElem = elem['offsetTop'] - 80;

                if (elem) {
                    this.ulList.nativeElement.scroll(
                        { top: topOfElem, behavior: 'auto' }
                    );
                }
            }
        }, 50);
    }
}
