import { Component, ChangeDetectionStrategy, Input, Output, ElementRef, Renderer2, ChangeDetectorRef, EventEmitter, HostBinding, HostListener, AfterViewInit, Directive, TemplateRef, OnDestroy, ComponentRef, EmbeddedViewRef, ViewContainerRef, Injector, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import Tether from 'tether';

import { replaceClass, toBoolean, uniqueId } from '../../utils/util';
import { placement } from './placements';

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

@Directive({
    selector: '[uno-popover-trigger]',
    exportAs: 'unoPopoverTrigger'
})
export class PopoverTriggerDirective implements OnDestroy {

    @Input() unoPopover: string | TemplateRef<any>;

    @Input() unoPopoverHeader: string;
    @Input() unoPopoverFooter: string;

    // Is it an "info" popover? A "download" type? With DATA to poulate the template?
    @Input() unoPopoverTemplate: 'defaultContent' | 'infoContent' | 'downloadContent' = 'defaultContent';
    @Input() unoPopoverTemplateData: any;
    @Input() hasEdit: boolean;
    @Input() hasDelete: boolean = true;
    @Input() infoTitle = 'Info | Detail';
    @Input() infoCreatedBy = 'Created By';
    @Input() infoModifiedBy = 'Modified By';
    @Input() infoDate = 'Date';


    @Input() set unoPopoverPlacement(_placement: Direction) {
        this.placement = _placement || 'top';
        this.setTether();
    }

    @Input() set unoPopoverTheme(theme: string) {
        this.theme = theme;
        this.setPopover();
    }

    @Input() set unoPopoverNubbin(_nubbin: Direction) {
        this.nubbin = _nubbin || 'top';
        this.setPopover();
    }

    @Input() set unoPopoverSize(_size: Size) {
        this.size = _size;
        this.setPopover();
    }

    @Input() unoPopoverTooltip: string | boolean;

    @Input() set unoPopoverDelay(delay: any | any[]) {
        delay = Array.isArray(delay) ? delay : [delay, delay];
        [this.openDelay, this.closeDelay] = delay.map(Number);
    }

    @Input() set unoPopoverInteractive(interactive: boolean | string) {
        this.interactive = toBoolean(interactive);
    }
    get unoPopoverInteractive() {
        return this.interactive;
    }

    @Input() set unoPopoverOpen(open: boolean) {
        this.toggle(open, open ? this.openDelay : this.closeDelay);
    }

    // Emit an event when current popover is shown or hidden
    @Output() unoPopoverToggled = new EventEmitter<boolean>();
    // Pass through the trigger ANY EVENT happening on <uno-popover /> on a specific <ng-template /> TEMPLATE:
    @Output() unoPopoverTemplateEvent = new EventEmitter<any>();

    public popover: PopoverComponent;
    private componentRef: ComponentRef<PopoverComponent>;
    private viewRef: EmbeddedViewRef<any>;
    private placement: Direction = 'top';
    private theme: string;
    private nubbin: Direction;
    private size: Size;
    private tether: Tether;
    private openDelay = 0;
    private closeDelay = 0;
    private toggleTimeout: any = null;
    private interactive = false;
    private template$: Subscription;
    private interactive$: Subscription;

    constructor(
        private element: ElementRef,
        private viewContainer: ViewContainerRef,
        private injector: Injector,
        private ngZone: NgZone,
        private renderer: Renderer2
    ) { }

    // Expose open method
    public open(delay = this.openDelay) {
        this.toggle(true, delay);
    }

    // Expose close method
    public close(delay = this.closeDelay) {
        this.toggle(false, delay);
    }

    public position(async = true) {
        this.ngZone.runOutsideAngular(() => {
            if (async) {
                setTimeout(() => this.tether.position());
            } else {
                this.tether.position();
            }
        });
    }

    public ngOnDestroy() {
        this.destroy();
    }

    private toggle(open: boolean, delay: number) {
        if (this.toggleTimeout !== null) {
            clearTimeout(this.toggleTimeout);
            this.toggleTimeout = null;
        }

        const toggleFn = (open ? this.create : this.destroy).bind(this);

        if (delay > 0) {
            this.toggleTimeout = setTimeout(() => {
                this.toggleTimeout = null;
                toggleFn();
            }, delay);
        } else {
            toggleFn();
        }
    }

    private setTether(create = false) {
        if (!this.tether && !create) {
            return;
        }

        const { attachment, targetAttachment, offset } = placement(this.placement);
        const options = {
            element: this.popover.element.nativeElement,
            target: this.element.nativeElement,
            attachment,
            targetAttachment,
            offset
        };

        if (create) {
            this.tether = new Tether(options);
        } else {
            this.tether.setOptions(options);
        }

        this.setPopover();
    }

    private setPopover() {
        if (!this.popover) {
            return;
        }

        const { opposite } = placement(this.placement);
        this.popover.nubbin = this.nubbin || opposite;
        this.popover.theme = this.theme;
        this.popover.tooltip = this.unoPopoverTooltip;
        this.popover.size = this.size || 'medium';
    }

    private create() {
        if (this.componentRef) {
            return;
        }

        const { nodes, viewRef } = this.getProjectableNodes();
        this.viewRef = viewRef;

        this.componentRef = this.viewContainer.createComponent(PopoverComponent, { index: 0, injector: this.injector, projectableNodes: [nodes] });
        this.popover = this.componentRef.instance;

        this.popover.header = this.unoPopoverHeader;
        this.popover.footer = this.unoPopoverFooter;
        // Is it an "info" popover? A "download" type? With DATA to poulate the template?
        this.popover.templateType = this.unoPopoverTemplate;
        this.popover.templateTypeData = this.unoPopoverTemplateData;
        this.popover.hasEdit = this.hasEdit;
        this.popover.hasDelete = this.hasDelete;
        this.popover.infoTitle = this.infoTitle;
        this.popover.infoCreatedBy = this.infoCreatedBy;
        this.popover.infoModifiedBy = this.infoModifiedBy;
        this.popover.infoDate = this.infoDate;
        // Do we need the "close" icon, inside popover? Just check if unoPopoverInteractive="true"
        this.popover.isInteractive = this.unoPopoverInteractive;

        this.popover.afterViewInit
            .pipe(take(1))
            .subscribe(() => this.position(false));

        if (this.interactive) {
            this.interactive$ = this.popover.onInteraction.subscribe((enter: boolean) => this.unoPopoverOpen = enter);
        }

        // Pass through the trigger ANY EVENT happening on <uno-popover /> on a specific <ng-template /> TEMPLATE:
        this.template$ = this.popover.templateEventEmiter.subscribe((objData: any) => this.unoPopoverTemplateEvent.emit(objData));

        this.setTether(true);

        // To avoid unexpected behavior when template "lives" inside an OnPush
        // component, explicitlly request change detection to run on creation.
        this.popover.changeDetector.markForCheck();

        this.unoPopoverToggled.emit(true);
    }

    private getProjectableNodes(): { nodes: any[], viewRef?: EmbeddedViewRef<any> } {
        if (this.unoPopover instanceof TemplateRef) {
            const viewRef: EmbeddedViewRef<any> = this.viewContainer.createEmbeddedView(this.unoPopover as TemplateRef<any>);
            return { nodes: viewRef.rootNodes, viewRef };
        } else {
            return { nodes: [this.renderer.createText(this.unoPopover as string)] };
        }
    }

    private destroy() {
        if (!this.componentRef) {
            return;
        }

        this.tether.destroy();
        this.tether = null;

        // Cleanup template view
        if (this.viewRef) {
            this.viewContainer.remove(this.viewContainer.indexOf(this.viewRef));
            this.viewRef = null;
        }

        this.viewContainer.remove(this.viewContainer.indexOf(this.componentRef.hostView));
        this.componentRef.destroy();
        this.componentRef = null;
        this.popover = null;

        if (this.interactive$) {
            this.interactive$.unsubscribe();
        }

        if (this.template$) {
            this.template$.unsubscribe();
        }

        this.unoPopoverToggled.emit(false);
    }
}


@Directive({ selector: '[uno-popover-click-behavior]' })
export class PopoverClickBehaviorDirective {

    triggerElement: HTMLElement;
    isInfoPopoverOpened = false;

    constructor(
        // *********************************************************************************
        // On ClickToClose Directive, we also have access to all Trigger Directive's Methods:
        // (like "unoPopover", "unoPopoverHeader", "unoPopoverOpen()", etc.)
        // *********************************************************************************
        private trigger: PopoverTriggerDirective,
    ) { }

    // Clicking specific on TRIGGER (icon, button, div, span, etc.):
    @HostListener('click', ['$event'])
    public onClick(evt) {
        // Don't let any other coded click event grab this 'click':
        evt.preventDefault();
        evt.stopPropagation();

        // As TRIGGER can be any HTML tag, we grab it here:
        this.triggerElement = evt.target;

        if (!this.isInfoPopoverOpened) {
            // Trigger <uno-popover /> to open:
            this.trigger.unoPopoverOpen = true;
        } else {
            this.trigger.unoPopoverOpen = false;
        }
        // Update opened state:
        this.isInfoPopoverOpened = !this.isInfoPopoverOpened;
    }

    // Clicking... all over!
    @HostListener('document:click', ['$event'])
    public closePopoverTrigger (evt) {
        // Must be opened, to close it! ;-)
        if (this.isInfoPopoverOpened === true) {

            const popoverElement = this.trigger.popover.element.nativeElement;
            const closeIconTrigger = popoverElement.querySelector('.popover-close-icon');

            if (
                // Icon "close" was clicked:
                closeIconTrigger.contains(evt.target)
                ||
                // Anywere outside popoverElement (that's NOT the trigger itself!) was clicked:
                (!popoverElement.contains(evt.target) && evt.target !== this.triggerElement)
            ) {
                this.trigger.unoPopoverOpen = false;
                this.isInfoPopoverOpened = false;
            }
        }
    }

}

@Directive({ selector: '[unoPopoverBehavior]' })
export class PopoverBehaviorDirective {

    @HostBinding('attr.tabindex') public tabindex = 0;

    constructor(
        // *********************************************************************************
        // On Behaviour Directive, we also have access to all Trigger Directive's Methods:
        // (like "unoPopover", "unoPopoverHeader", "unoPopoverOpen()", etc.)
        // *********************************************************************************
        private trigger: PopoverTriggerDirective
    ) { }

    @HostListener('mouseenter')
    @HostListener('focus')
    public onMouseOver() {
        // Trigger <uno-popover /> to open:
        this.trigger.unoPopoverOpen = true;
    }

    @HostListener('mouseleave')
    @HostListener('blur')
    public onMouseOut() {
        // Trigger <uno-popover /> closing:
        this.trigger.unoPopoverOpen = false;
    }
}
