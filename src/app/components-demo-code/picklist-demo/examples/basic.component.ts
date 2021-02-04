import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent implements OnDestroy {

    open = false;
    open2 = false;
    openDisabled = false;
    openAsync = false;
    openMultiFiltering = false;

    multiple = true;

    pick: any = [];
    pickDisabled: any = [];
    pickAsyncItem: any = {};
    pickMultiFiltering: any = {};

    pickSelected = [
        { value: 'Value extra 5', id: 5 },
        { value: 'Value extra 6', id: 1 },
        { value: 'Value extra 7', id: 2 },
        { value: 'Value extra 8', id: 3 },
    ];

    items = [
        { value: 'Choose a date item...', icon: 'calendar', badgeType: 'warning', id: 35 },
        { value: 'Protect your items!', icon: 'shield', badgeType: 'error', id: 25 },
        { value: 'Open the secret entrance item... please!', icon: 'pass', badgeType: 'success', id: 15 },
        { value: 'Value extra 1', id: 9 },
        { value: 'Value extra 2', id: 8 },
        { value: 'Value extra 3', id: 7 },
        { value: 'Value extra 4', id: 6 },
        { value: 'Value extra 5', id: 5 },
        { value: 'Value extra 6', id: 1 },
        { value: 'Value extra 7', id: 2 },
        { value: 'Value extra 8', id: 3 },
    ];
    // or:
    asyncObservableItems$: Observable<any[]>;
    asyncTotalResults: number;
    asyncPageNumber = 1;
    asyncTotalPageItems = 30;
    asyncSubscriber: Subscription;
    // String identifying the type of picklist Dropdown list fill in - paginated | cumulate pages:
    selectedFill: string;
    // Flag if at each http call we'll present the (current) page results or cumulate each:
    asyncCumulateItems: boolean;
    // Use this as final result, either with page cumulation or not:
    asyncItems = [];

    multiFilteringItems = [
        { Id: 1, SiteId: 1, name: 'Plant #0', tagNum: '2345TOvc-dr' },
        { Id: 2, SiteId: 1, name: 'Plant #1', tagNum: 'TOvc-dr' },
        { Id: 3, SiteId: 1, name: 'Plant #2, with a very big name, tah will be truncate', tagNum: 'asdfTYUTOvc-dr' },
        { Id: 4, SiteId: 1, name: 'Plant #0, side-B', tagNum: '1-xs' },
        { Id: 5, SiteId: 1, name: 'Plant #4', tagNum: '12345TOvc-xs. We can try this one to see big Tag Numbers!' },
        { Id: 6, SiteId: 1, name: 'Plant #5', tagNum: '12345TOvc-at!' },
        { Id: 7, SiteId: 1, name: 'Plant #6', tagNum: '(n/e)' }
    ];
    filteringStr: string;

    constructor(private http: HttpClient) { }

    ngOnDestroy() {
        if (this.asyncSubscriber) {
            this.asyncSubscriber.unsubscribe();
        }
    }

    // User can choose how picklist Dropdown will be filled, since Github brings items always PAGINATED:
    changePicklistFillInType(evt) {
        this.asyncCumulateItems = (this.selectedFill === 'Cumulate') ? true : false;
        // Reinit the Dropdown list, calling http service, as if for the 1st time:
        this.asyncItems = [];
        this.asyncPageNumber = 1;
        this.callGitHubAPI();
    }

    // Call Github "search users" API: https://developer.github.com/v3/search/#search-users
    callGitHubAPI(userName = 'pedro') {
        this.asyncObservableItems$ = this.http
            .get(`//api.github.com/search/users?q=${userName}&page=${this.asyncPageNumber}`).pipe(
                map(
                    (response: any) => {
                        this.asyncTotalResults = response.total_count;
                        // We return, filling in the Observable var ALWAYS with the received called (PAGINATED) service items:
                        return response.items;
                    }
                ));

        // If we want to cumulate the GitHub pagination, we need to sniff inside the Observable data.
        // So... you MUST subscribe to the http service!
        // Then, each time a new page is called, through the async service, we either present it or cumulate it @ "this.asyncItems":
        this.asyncSubscriber = this.asyncObservableItems$.subscribe(
            (eachPageItems) =>
                this.asyncItems = this.asyncCumulateItems ? this.asyncItems.concat(eachPageItems) : eachPageItems
        );
    }

    // If this.selectedFill = 'Navigating through Paginated Items' we provide the navigation Method:
    navigate(direction: number) {
        this.asyncPageNumber = this.asyncPageNumber + direction;
        // Call http service for next/previous page, depending on passed in "direction":
        this.callGitHubAPI();
    }

    // We can be watching <uno-picklist /> scrolling, and pull some more items when bottom is reached:
    scrollPicklist(evt) {
        if (evt.endReached) {
            // Depending on "this.asyncCumulateItems" boolean value, list will increase or a new page set of items will be listed:
            this.navigate(+1);
        }
    }

    // You can have a function, instead of an item property (string), to filter through several properties or to compose filtering
    multiFilteringFilter() {
        // return 'login';
        return filterProp =>
            filterProp.name.indexOf(this.filteringStr) !== -1
            ||
            filterProp.tagNum.indexOf(this.filteringStr) !== -1;
    }

    // ... but we must catch up what is changing:
    userChangedFilter(filterStr: string) {
        this.filteringStr = filterStr;
    }


    get pickLabel() {
        if (this.multiple) {
            return this.pick && this.pick.length ? `${this.pick.length} options selected` : 'Select option(s)';
        } else {
            return this.pick.value || 'Select an option';
        }
    }

    optionSelected(obj: { HTMLElement: HTMLElement, idx: number }) {
        console.warn('Picklist selected option', obj, ' with value=', obj.HTMLElement.innerText);
    }
}
