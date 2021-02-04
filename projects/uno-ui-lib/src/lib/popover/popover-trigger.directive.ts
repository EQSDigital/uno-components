import {
    Directive, Input, ElementRef, ComponentRef, TemplateRef, ViewContainerRef,
    Renderer2, ComponentFactoryResolver, Injector, EmbeddedViewRef, ComponentFactory,
    Output, EventEmitter, NgZone, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as Tether from 'tether';

import { PopoverComponent, Direction, Size } from './popover.component';
import { placement } from './placements';
import { toBoolean } from '../../util/util';

@Directive({
    // tslint:disable-next-line:directive-selector
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
    private popoverFactory: ComponentFactory<PopoverComponent>;
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
        private renderer: Renderer2,
        componentFactoryResolver: ComponentFactoryResolver
    ) {
        this.popoverFactory = componentFactoryResolver.resolveComponentFactory(PopoverComponent);
    }

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
            offset,
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

        this.componentRef = this.viewContainer.createComponent(this.popoverFactory, 0, this.injector, [nodes]);
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
