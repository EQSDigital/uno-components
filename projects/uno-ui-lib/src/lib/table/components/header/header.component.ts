import { Component, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Grid } from '../../lib/grid';
import { ActionCustom } from '../../table.interfaces';
import { Row } from '../../lib/data-set/row';
import { SearchComponent } from '../../../search/search.component';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { PopoverTriggerDirective } from '../../../popover/popover.component';
import { IconComponent } from '../../../icon/icon.component';


@Component({
    selector: 'header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
    standalone: true,
    imports: [SearchComponent, IconComponent, PopoverTriggerDirective, TranslateDirective, TranslatePipe]
})

export class HeaderComponent implements OnChanges {
    @Input() grid: Grid;

    @Input() headerSettings: any;

    @Input() currentSearch: string;

    @Output() create = new EventEmitter<any>();

    @Output() searchTerm = new EventEmitter<string>();

    @Output() customAction = new EventEmitter<ActionCustom>();

    @Output() clickIconOptions = new EventEmitter<boolean>();

    /**
     * The main actions there are the icons I can see on the header.
     */
    mainActions: ActionCustom[];

    /**
     * The other actions there are the icons go to popover.
     */
    otherActions: ActionCustom[];

    /**
     * Variable to control the popover with sort and filter.
     */
    openPopover = false;

    /**
     * Variable to control the popover with options of the table.
     */
    openPopoverOptions = false;

    @ViewChild(SearchComponent) search: SearchComponent;

    /**
     * Variable with all actions of the header.
     */
    private headerActions: ActionCustom[];

    ngOnChanges() {
        this.headerActions = this.grid.settings.headerActions;

        // ONLY SHOW 4 ICONS ON HEADER, THE OTHERS GO TO POPOVER.
        if (this.grid.settings.actions.add) { // CHECK IF ADD IS EDIT IN LINE
            this.mainActions = this.headerActions.slice(0, 2);
            this.otherActions = this.headerActions.slice(2, this.headerActions.length);
        } else {
            this.mainActions = this.headerActions.slice(0, 3);
            this.otherActions = this.headerActions.slice(3, this.headerActions.length);
        }
    }

    onAdd() {
        // Check user is not EDITING any row:
        // Disable CREATE possibility since they use the same "editingForm" form!
        // Side effects are obvious: validators coloring gets all mixed up
        // - SAME (component) element is being scaned in more than one place (row).
        if (this.grid.dataSet.rows.filter((row: Row) => row.isInEditing).length > 0) {
            return false;
            // But inform the user @ hoverIn()!
        }

        this.create.emit();
    }

    hoverIn() {
        if (this.grid.dataSet.rows.filter((row: Row) => row.isInEditing).length > 0) {
            this.openPopover = true;
        }
    }

    onClickOptions() {
        this.openPopoverOptions = !this.openPopoverOptions;
        this.clickIconOptions.emit(this.openPopoverOptions);
    }
}
