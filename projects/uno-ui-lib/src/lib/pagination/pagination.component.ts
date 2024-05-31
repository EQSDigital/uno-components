import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * The Pagination component
 *
 * @example
 * <uno-pagination></uno-pagination>
 */

export class PageEvent {
    /** The current page index */
    currentIndex: number;

    /** The current page size */
    howManyPerPage: number;
}

class Page {
    public label: string;
    public value: number;
}

const DEFAULT_PAGE_SIZE = 10;

@Component({
    selector: 'uno-pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {

    /**
     * The length of the total number of items that are being paginated. Defaulted to 0.
     */
    @Input()
    get numItems(): number {
        return this._numItems;
    }
    set numItems(val: number) {
        this._numItems = Math.max(isNaN(val) ? 0 : Number(val), 0);
        this.updatePageSizeOptions();
        this.setNumberOfPages();
    }

    private _numItems: number;

    /**
     * The set of provided page size options to display to the user. Default to [10, 25, 50]
     */
    @Input()
    get pageSizeOptions(): number[] {
        return this._pageSizeOptions;
    }
    set pageSizeOptions(val: number[]) {
        this._pageSizeOptions = val || [];
        this.updatePageSizeOptions();
    }

    private _pageSizeOptions: number[];

    /**
     * The zero-based page index of the displayed list of items. Defaulted to 0.
     */
    @Input()
    get pageIndex(): number {
        return this._pageIndex;
    }
    set pageIndex(val: number) {
        this._pageIndex = Math.max(isNaN(val) ? 0 : Number(val), 0);
        this.calculateStartEndRange();
    }

    private _pageIndex = 0;

    /**
     * Number of items to display on a page. By default set to 10.
     */
    @Input()
    get pageSize(): number {
        return this._pageSize;
    }
    set pageSize(val: number) {
        this._pageSize = Math.max(isNaN(val) ? 0 : Number(val), 0);
        this.setNumberOfPages();
        this.updatePageSizeOptions();
    }

    private _pageSize: number;

    /**
     * Event Emitter when the pagination changes the page size or page index.
     */
    @Output() page = new EventEmitter<PageEvent>();

    /**
     * Variable to show or not the list to select the number of rows in table.
     */
    public showList = false;

    /**
     * Variable to set pages for paginator.
     */
    public pages: Page[] = [];

    public numberOfPages = 0;

    public startRange = 0;

    public endRange = 0;

    displayPageSizeOptions: number[];

    constructor() {
        this._numItems = 0;
        this._pageSize = 0;
        this._pageIndex = 0;
        this._pageSizeOptions = [10, 25, 50];
    }

    /**
     * Changes the page size.
     */
    public changePageSize(pageSize: number) {
        const startIndex = this.pageIndex * this.pageSize;

        this.pageIndex = Math.floor(startIndex / pageSize) || 0;
        this.pageSize = pageSize;
        this.setNumberOfPages();
        this.page.emit({ currentIndex: this.pageIndex, howManyPerPage: this.pageSize });
    }

    /**
     * On clicked outside of "changePageSize" div.
     */
    public onClickedOutside(outside: boolean): void {
        if (this.showList && outside) {
            this.showList = false;
        }
    }

    /**
     * Go to the first page.
     */
    public firstPage(): void {
        this.setCurrent(0);
    }

    /**
     * Go to the previous page.
     */
    public previousPage(): void {
        this.setCurrent(this.pageIndex - 1);
    }

    /**
     * Set the current page number.
     */
    public setNumberOfPages() {
        this.numberOfPages = Math.ceil(this.numItems / this.pageSize);

        this.calculateStartEndRange();
    }

    public calculateStartEndRange() {
        if (this.numItems === 0 || this.pageSize === 0) {
            this.startRange = 0;
            this.endRange = 0;
        } else {
            this.startRange = this.pageIndex * this.pageSize + 1;

            this.endRange = this.startRange - 1 < this.numItems ?
                Math.min(this.startRange - 1 + this.pageSize, this.numItems) :
                this.startRange - 1 + this.pageSize;
        }

        this.updatePageLinks();
    }

    /**
     * Set the current page number.
     */
    public setNumber($event: Event, page: number) {
        $event.stopPropagation();
        this.setCurrent(page);
    }

    /**
     * Go to the next page.
     */
    public nextPage(): void {
        this.setCurrent(this.pageIndex + 1);
    }

    /**
     * Go to the last page.
     */
    public lastPage(): void {
        this.setCurrent(this.getLastPage());
    }

    /**
     * Returns the last page number.
     */
    public getLastPage(): number {
        if (this.numItems < this.pageSize) {
            return 1;
        }

        return this.numberOfPages - 1;
    }

    /**
     * Set the current page number.
     */
    public setCurrent(page: number) {
        this.pageIndex = page;
        this.calculateStartEndRange();
        this.page.emit({ currentIndex: this.pageIndex, howManyPerPage: this.pageSize });
    }

    /**
     * Updates the page links and checks that the current page is valid.
     */
    private updatePageLinks(): void {
        this.pages = this.createPageArray(this.pageIndex, this.pageSize, this.numItems, 9);
    }

    /**
     * Returns an array of Page objects to use in the pagination controls.
     */
    private createPageArray(currentPage: number, itemsPerPage: number, totalItems: number, paginationRange: number): Page[] {
        // paginationRange could be a string if passed from attribute, so cast to number.
        paginationRange = +paginationRange;

        const pages: Page[] = [];
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const halfWay = Math.ceil(paginationRange / 2);

        const isStart = currentPage <= halfWay;
        const isEnd = totalPages - halfWay < currentPage;
        const isMiddle = !isStart && !isEnd;

        const ellipsesNeeded = paginationRange < totalPages;
        let i = 1;

        while (i <= totalPages && i <= paginationRange) {
            let _label: any;
            const pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
            const openingEllipsesNeeded = (i === 2 && (isMiddle || isEnd));
            const closingEllipsesNeeded = (i === paginationRange - 1 && (isMiddle || isStart));
            if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                _label = '...';
            } else {
                _label = pageNumber;
            }
            pages.push({
                label: _label,
                value: pageNumber
            } as Page);
            i++;
        }

        return pages;
    }

    /**
     * Given the position in the sequence of pagination links [i],
     * ...figure out what page number corresponds to that position.
     */
    private calculatePageNumber(i: number, currentPage: number, paginationRange: number, totalPages: number): number {
        const halfWay = Math.ceil(paginationRange / 2);
        if (i === paginationRange) {
            return totalPages;
        } else if (i === 1) {
            return i;
        } else if (paginationRange < totalPages) {
            if (totalPages - halfWay < currentPage) {
                return totalPages - paginationRange + i;
            } else if (halfWay < currentPage) {
                return currentPage - halfWay + i;
            } else {
                return i;
            }
        } else {
            return i;
        }
    }

    private updatePageSizeOptions() {
        if (!this.pageSize) {
            this._pageSize = this.pageSizeOptions.length !== 0 ?
                this.pageSizeOptions[0] :
                DEFAULT_PAGE_SIZE;
        }

        this.displayPageSizeOptions = this.pageSizeOptions.slice();

        if (this.displayPageSizeOptions.indexOf(this.pageSize) === -1) {
            this.displayPageSizeOptions.push(this.pageSize);
        }

        this.displayPageSizeOptions.sort((a: number, b: number) => a - b);
    }
}
