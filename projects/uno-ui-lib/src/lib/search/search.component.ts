import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
@Component({
    selector: 'uno-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

    @Input() public placeholder = 'searchBox';

    @Input() public type: 'primary' | 'secondary' = 'primary';

    @Output() private searchTerm = new EventEmitter<string>();

    inSearchMode = false;

    // Get access to the input to manipulate it.
    @ViewChild('searchText') inputSearch: ElementRef;

    @ViewChild('unoSearch') private unoSearch: ElementRef;

    constructor(private renderer: Renderer2) { }

    public onButtonClick(text: string) {
        if (text.length > 0) {
            this.inSearchMode = !this.inSearchMode;

            if (!this.inSearchMode) {
                this.renderer.setProperty(this.inputSearch.nativeElement, 'value', '');

                if (this.unoSearch) {
                    this.renderer.setStyle(this.unoSearch.nativeElement, 'border-bottom', '2px solid var(--grey)');
                }

                this.searchTerm.emit('');
            } else {
                if (this.unoSearch) {
                    this.renderer.setStyle(this.unoSearch.nativeElement, 'border-bottom', '2px solid var(--sapphire)');
                }

                this.searchTerm.emit(text);
            }
        } else {
            this.inSearchMode = false;

            if (this.unoSearch) {
                this.renderer.setStyle(this.unoSearch.nativeElement, 'border-bottom', '2px solid var(--grey)');
            }

            this.searchTerm.emit('');
        }
    }

    public keyDownFunction(event: any, text: string) {
        event.stopPropagation();
        if (event.keyCode === 13) {
            this.searchTerm.emit(this.normalizeString(text));

            if (text.length > 0) {
                this.inSearchMode = true;

                if (this.unoSearch) {
                    this.renderer.setStyle(this.unoSearch.nativeElement, 'border-bottom', '2px solid var(--sapphire)');
                }
            } else {
                this.inSearchMode = false;

                if (this.unoSearch) {
                    this.renderer.setStyle(this.unoSearch.nativeElement, 'border-bottom', '2px solid var(--grey)');
                }
            }
        }
    }

    private normalizeString(str: string): string {
        return str.normalize('NFD').replace(/\p{Diacritic}/gu, "");
    }
}
