import {
    Component, ChangeDetectionStrategy, Input, Output,
    ElementRef, Renderer2, ChangeDetectorRef, EventEmitter,
    HostBinding, HostListener, AfterViewInit
} from '@angular/core';

import { replaceClass, toBoolean, uniqueId } from '../../utils/util';

export type Direction = 'top' | 'top-left' | 'top-right' |
    'right' | 'right-top' | 'right-bottom' |
    'bottom' | 'bottom-left' | 'bottom-right' |
    'left' | 'left-top' | 'left-bottom';

export type Size = 'small' | 'medium' | 'large';

@Component({
    selector: 'uno-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent implements AfterViewInit {

    @Input() header: string;
    @Input() footer: string;
    @Input() hasEdit: boolean;
    @Input() hasDelete: boolean = true;
    @Input() infoTitle = 'Info | Detail';
    @Input() infoCreatedBy = 'Created By';
    @Input() infoModifiedBy = 'Modified By';
    @Input() infoDate = 'Date';

    // Is it an "info" popover? A "download" type? With DATA to poulate the template?
    @Input() templateType: 'defaultContent' | 'infoContent' | 'downloadContent' | 'datePickerContent' = 'defaultContent';
    @Input() templateTypeData: any;
    // Do we need the "close" icon, inside popover? Just check if unoPopoverInteractive="true"
    @Input() isInteractive: boolean | string;

    @Input() set theme(theme: any) {
        replaceClass(this, `slds-theme--${this._theme}`, theme ? `slds-theme--${theme}` : '');
        this._theme = theme;
    }

    @Input() set tooltip(isTooltip: any) {
        this._isTooltip = toBoolean(isTooltip);
        this.renderer[this._isTooltip ? 'addClass' : 'removeClass'](this.element.nativeElement, 'slds-popover--tooltip');
        this.renderer[this._isTooltip ? 'addClass' : 'removeClass'](this.element.nativeElement, 'slds-text-color--inverse');
    }

    set nubbin(direction: Direction) {
        replaceClass(this, `slds-nubbin--${this._nubbin}`, direction ? `slds-nubbin--${direction}` : '');
        this._nubbin = direction;
    }

    set size(size: Size) {
        replaceClass(this, `slds-popover--${this._size}`, size ? `slds-popover--${size}` : '');
        this._size = size;
    }

    @Output() afterViewInit = new EventEmitter();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onInteraction = new EventEmitter<boolean>();
    // Emit ANY EVENT happening on <uno-popover /> on a specific <ng-template /> TEMPLATE:
    @Output() templateEventEmiter = new EventEmitter<any>();

    uid = uniqueId('popover');

    @HostBinding('attr.aria-labelledby')
    get labelledby() {
        return this.header ? `${this.uid}-heading` : null;
    }

    _nubbin: Direction;
    _theme: string;
    _size: Size;
    _isTooltip = false;

    constructor(
        public element: ElementRef,
        public renderer: Renderer2,
        public changeDetector: ChangeDetectorRef
    ) {
        this.renderer.addClass(this.element.nativeElement, 'slds-popover');

        // Prevent position changes of "close by" elements
        this.renderer.setStyle(this.element.nativeElement, 'position', 'absolute');

        this.renderer.setAttribute(this.element.nativeElement, 'aria-describedby', this.uid);
    }

    ngAfterViewInit() {
        this.afterViewInit.emit();
    }

    @HostListener('mouseenter', ['$event', 'true'])
    @HostListener('mouseleave', ['$event', 'false'])
    interactiveHandler(evt: Event, isEnter: boolean) {
        this.onInteraction.emit(isEnter);
    }

    /**
     * Events on specific "downloadContent" <ng-template /> Template:
     */
    downloadContentDownloadFile(objFile: any) {
        // First add some properties to identify (on the caller which has the <uno-popover /> trigger),
        // on which Template and on which element (icon, button, div, etc.) the event was triggered from:
        const objDownloadFile = Object.assign({}, objFile, {
            fromTemplate: 'downloadContent',
            fromIcon: 'down'
        });

        // OK. Now emit a GENERAL emiter, passing in data+reference from where it took place:
        this.templateEventEmiter.emit(objDownloadFile);
    }

    downloadContentDeleteFile(objFile: any) {
        // First add some properties to identify (on the caller which has the <uno-popover /> trigger),
        // on which Template and on which element (icon, button, div, etc.) the event was triggered from:
        const objDeleteFile = Object.assign({}, objFile, {
                fromTemplate: 'downloadContent',
                fromIcon: 'trash'
            });

        // OK. Now emit a GENERAL emiter, passing in data+reference from where it took place:
        this.templateEventEmiter.emit(objDeleteFile);
    }

    downloadContentEditFile(objFile: any) {
        // First add some properties to identify (on the caller which has the <uno-popover /> trigger),
        // on which Template and on which element (icon, button, div, etc.) the event was triggered from:
        const objEditFile = Object.assign({}, objFile, {
                fromTemplate: 'downloadContent',
                fromIcon: 'edit'
            });

        // OK. Now emit a GENERAL emiter, passing in data+reference from where it took place:
        this.templateEventEmiter.emit(objEditFile);
    }

    datePickerContentChange(selectedDate: Date) {
        // Emit back for the instaltion TS/HTML:
        this.templateEventEmiter.emit(selectedDate);
    }
}
