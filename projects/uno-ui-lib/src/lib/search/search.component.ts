import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2, AfterViewInit, ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'uno-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements AfterViewInit {

    @Input() public placeholder = 'searchBox';

    @Input() public type: 'primary' | 'secondary' = 'primary';

    @Input() public currentSearch: string;

    @Output() private searchTerm = new EventEmitter<string>();

    public inSearchMode: boolean;

    // Get access to the input to manipulate it.
    @ViewChild('searchText') inputSearch: ElementRef;

    @ViewChild('unoSearch') private unoSearch: ElementRef;

    constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) { }

    public ngAfterViewInit() {
        if (this.currentSearch && this.currentSearch.length > 0) {
            this.inSearchMode = true;
            this.renderer.setProperty(this.inputSearch.nativeElement, 'value', this.currentSearch);
            this.renderer.setStyle(this.unoSearch.nativeElement, 'border-bottom', '2px solid var(--light-primary)');
            this.cdr.detectChanges();
        }
    }

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
                    this.renderer.setStyle(this.unoSearch.nativeElement, 'border-bottom', '2px solid var(--light-primary)');
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
                    this.renderer.setStyle(this.unoSearch.nativeElement, 'border-bottom', '2px solid var(--light-primary)');
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
