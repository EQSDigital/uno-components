import {
    Component, ChangeDetectionStrategy, ViewChild, ElementRef,
    Renderer2, Input, OnChanges, SimpleChanges, Output, EventEmitter, HostListener
} from '@angular/core';

@Component({
    selector: 'uno-input-tags',
    templateUrl: './input-tags.component.html',
    styleUrls: ['./input-tags.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTagsComponent implements OnChanges {
    /**
     * Variable whit all objects to list on dropdown.
     */
    @Input() objects: any[];

    /**
     * Variable with all selected objects, from all objects array.
     */
    @Input() selectedObjects: any[] = [];

    /**
     * Variable to set the object key.
     */
    @Input() key = 'id';

    /**
     * Variable to set the object value.
     */
    @Input() value = 'name';

    /**
     * Variable to set the placeholder when don't have any tag selected.
     */
    @Input() inputPlaceholder = 'Select options...';

    /**
     * Variable to enable/disable the input tags.
     */
    @Input() isDisable = false;

    /**
     * Variable that emit the selectedObjects.
     */
    @Output() objectsSelected = new EventEmitter<any[]>();

    /**
     * Variable with element reference of the input.
     */
    @ViewChild('search', { static: true }) search: ElementRef;

    /**
     * Variable to set the possible objects to show on dropdown.
     */
    filteredObjects = [];

    /**
     * Variable that control the open/close of the dropdown.
     */
    openDrop = false;

    /**
     * Variable to set the search term, for every time user remove/add a object the filter object update with search term.
     */
    searchTerm = '';

    /**
     * This method listens for the event "window:click".
     *
     * @param evt - The DOM element that trigger the listener.
     */
    @HostListener('window:click', ['$event'])
    clickOut(evt) {
        // If click inside image, show dropdown.
        if (!this.eRef.nativeElement.contains(evt.target.parentElement)) {
            this.openDrop = false;
        }
    }

    constructor(private eRef: ElementRef, private render: Renderer2) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.selectedObjects && changes.selectedObjects.currentValue) {
            this.filterArray();
        }
    }

    /**
     * This method open the dropdown and focus the input with cursor.
     */
    onDivClick() {
        this.openDrop = !this.openDrop;

        if (this.openDrop) {
            this.searchObject(this.searchTerm);
            setTimeout(() => this.search.nativeElement.focus(), 0);
        }
    }

    /**
     * This method remove a objct to the selectedObjects.
     *
     * @param obj - The object to be removed from array of the selectedObjects.
     */
    removeObject(obj: any) {
        const index = this.selectedObjects.findIndex((aux) => obj[this.key] === aux[this.key]);

        if (index > -1) {
            this.selectedObjects.splice(index, 1);
            this.searchObject(this.searchTerm);
        }

        this.objectsSelected.emit(this.selectedObjects);
    }

    /**
     * This method add a objct to the selectedObjects.
     *
     * @param obj - The object to be added to array of the selectedObjects.
     */
    addObject(obj: any) {
        this.selectedObjects.push(obj);
        this.searchObject(this.searchTerm);

        this.render.setProperty(this.search.nativeElement, 'value', '');

        this.objectsSelected.emit(this.selectedObjects);
    }

    /**
     * This method its called every time user remove/add a term for search.
     *
     * @param evt - The input element.
     */
    onSearchChange(evt: any) {
        if (evt.target.value.length > 0) {
            this.render.setStyle(this.search.nativeElement, 'width', `${evt.target.value.length * 12}px`);
        }

        this.openDrop = true;

        this.searchObject(evt.target.value);
    }

    /**
     * This method remove/add elements to dropdown every time user select a object from list.
     */
    filterArray() {
        this.filteredObjects = this.objects.filter((obj) =>
            this.selectedObjects.findIndex((aux) => aux[this.key] === obj[this.key]) < 0
        );
    }

    /**
     * This method filter the dropdown objects where term match on objects value.
     *
     * @param search - The term for search on all objects value.
     */
    searchObject(search: string) {
        this.searchTerm = search;

        this.filterArray();

        if (search.length > 0) {
            this.filteredObjects = this.filteredObjects.filter((obj: any) =>
                obj[this.value].toLowerCase().indexOf(search) > -1
            );

            if (this.filteredObjects.length === 0) {
                this.searchTerm = '';
            }
        }
    }

    /**
     * This method remove the object when user press the backspace key.
     */
    onBackspacePressed() {
        // Only remove tag if input value are empty.
        if (this.search.nativeElement.value.length === 0) {
            // Only remove tag if selectedObjects length are not empty.
            if (this.selectedObjects.length > 0) {
                // Remove the last element of the selectedObjects.
                this.selectedObjects.splice(this.selectedObjects.length - 1, 1);
                this.searchObject(this.searchTerm);
            }
        }
    }
}
