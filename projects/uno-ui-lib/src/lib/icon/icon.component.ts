import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'uno-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {

    /**
     * Variable to choose the sprite of the icons.
     */
    @Input() svgType: 'sprite' | 'sprite-color' = 'sprite';

    /**
     * Do eventualy Observable 'icon' (path) by Angular OnChanges, to have a better control., and not directly @ HTML:
     */
    _icon: string;

    /**
     * Variable to set the icon name.
     */
    @Input('icon') set setIcon(icon: string) {
        this._icon = icon;
    }

    /**
     * Variable to define if icon have opacity or not.
     */
    @Input() withOpacity = true;

    /**
     * Pre-defined - see THIS components CSS for the allow types.
     */
    @Input() color: 'default' | 'white' | 'black' | 'grey' | 'green-menu' = 'default';

    /**
     * Pre-defined - see Lightning System CSS for the allow measurements.
     */
    @Input() size: 'large' | 'medium' | 'small' | 'x-small' = 'medium';

    @Input() customColor;

    iconPath() {
        return `assets/icons/uno-sprite/svg/${this.svgType}.svg#${this._icon}`;
    }
}
