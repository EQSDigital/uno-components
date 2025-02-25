import { Component } from '@angular/core';

import { DropdownDirective, IconComponent, ButtonDirective } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    styleUrls: ['../dropdown-demo.component.css'],
    standalone: true,
    imports: [DropdownDirective, IconComponent, ButtonDirective]
})

export class BasicComponent {
    openDropdown: boolean;
    openSimpleDropdown: boolean;

    defaultSelectedItem = 'Value...? ';
    selectedItem = this.defaultSelectedItem;
    selected: string; selectedIcon: string;

    items = [
        { value: 'Choose a date...?', icon: 'calendar' },
        { value: 'Protect your items!', icon: 'shield' },
        { value: 'Open the secret entrance... please!', icon: 'pass' },
    ];

    anotherItems = [
        { value: 'Value 1' }, { value: 'Value 2' }, { value: 'Value 3' }, { value: 'Value 4' }
    ];

    onToggle($event: Event) {
        $event.stopPropagation();
        this.openDropdown = true;
    }

    dropdownState(isOpened: boolean) {
        console.warn('Simple Dropdown is now... opened???', isOpened);
    }

    optionSelected(composedObj: any) {
        const obj: HTMLElement = composedObj.HTMLElement;
        const idx: number = composedObj.idx;

        // Update the "selectedItem" text @ Dropdown's HTML - keep in mind could be a "reset" option, the selected one:
        if ([].slice.call(obj.parentElement.classList).indexOf('unselect-item') === -1) {
            this.selectedItem = obj.innerText;
        } else {
            this.selectedItem = this.defaultSelectedItem;
        }
        console.warn('Simple Dropdown selected option', obj, ', idx=' + idx + ', and with value=', this.selectedItem);
    }
}
