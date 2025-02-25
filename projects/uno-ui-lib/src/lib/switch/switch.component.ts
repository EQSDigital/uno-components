import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'uno-switch',
    template: `
        <div class="switch-container" [style.minWidth]="minWidth">
          <span class="switch"
            [class.checked]="checked"
            [class.disabled]="disable"
            [class.switch-large]="size === 'large'"
            [class.switch-medium]="size === 'medium'"
            [class.switch-small]="size === 'small'">
        
            <mark></mark>
          </span>
          @if (checked && enabledText) {
            <span class="uno-switch-boolean enabled-text">{{ enabledText }}</span>
          }
          @if (!checked && disabledText) {
            <span class="uno-switch-boolean disabled-text">{{ disabledText }}</span>
          }
        </div>
        `,
    styleUrls: ['./switch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: []
})
export class SwitchComponent {

    @Input() public checked: boolean;
    @Input() public disable: boolean;
    @Input() public minWidth: string;
    @Input() public size: 'small' | 'medium' | 'large' = 'small';

    @Input() public enabledText: string;
    @Input() public disabledText: string;

    @Output() public changed = new EventEmitter<boolean>();

    constructor() { }

    @HostListener('click') onToggle() {
        if (this.disable) {
            return;
        }

        this.checked = !this.checked;
        this.changed.emit(this.checked);
    }
}
