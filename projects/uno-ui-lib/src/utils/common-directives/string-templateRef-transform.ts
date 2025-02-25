import { Component, Input, TemplateRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: '[unoHelperStringTemplateRef]',
    template: `{{content}}<ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet]
})
export class StringTemplateRefTransformComponent implements OnChanges {
    @Input() unoHelperStringTemplateRef: string | TemplateRef<any>;

    content: string;
    contentTemplate: TemplateRef<any>;

    ngOnChanges() {
        [this.content, this.contentTemplate] = this.unoHelperStringTemplateRef instanceof TemplateRef
            ? ['', <TemplateRef<any>>this.unoHelperStringTemplateRef]
            : [<string>this.unoHelperStringTemplateRef, null];
    }
}
