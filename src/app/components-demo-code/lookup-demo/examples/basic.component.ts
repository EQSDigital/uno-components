import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LookupComponent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [LookupComponent]
})

export class BasicComponent {
    superhero: string = null;
    value: '';
    address = '';

    superheroes = ['Hulk', 'Flash', 'Superman', 'Batman', 'Spiderman', 'Iron Man', 'Thor', 'Wolverine', 'Deadpool'];

    githubUser: any;
    lookUpAsyncScrollerStr = '';
    asyncScrollerPageNumber = 1;
    // Flag if at each http call we'll present the (current, 1st) page results or cumulate each coming (new) page of Items:
    asyncCumulateItems: boolean;
    arrayCumulatedItems = [];
    // Catch the total number of items brought by each Service call:
    asyncScrollerTotalResults: number;
    asyncScrollerCurrentResults: number;
    APIUserObj: any;


    constructor(private readonly http: HttpClient) { }

    lookup = (query: string, source = this.superheroes): string[] => {
        if (!query) {
            return null;
        }

        return source.filter(
            (d: string) => d.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    }

    // Look inside an Observable's http GET request Service:
    lookupAsync = (query: string): Observable<any[]> => {
        if (!query) {
            return null;
        }

        return this.http.get<any>(`//jsonplaceholder.typicode.com/users?website_like=${query}`);
    }

    // Look inside an Observable's PAGINATED http GET request Service, cumulating onScrollDown bottom limit reached:
    lookupAsyncScroller = (query: string): Observable<any[]> => {
        if (!query) {
            return null;
        }    // <= Github Users API will throw an error and stop working!

        // Allow for returning just first page, again:
        if (!this.asyncCumulateItems) {
            this.asyncScrollerPageNumber = 1;
            this.arrayCumulatedItems = [];
            this.asyncScrollerCurrentResults = 0;
        }

        return (
            this.http
                .get(`//api.github.com/search/users?q=${query}&page=${this.asyncScrollerPageNumber}`).pipe(
                    map(
                        (response: any) => {
                            // return response.items;
                            // Instead, we return, with the received called (PAGINATED) service items or with the cumulated array of pages:
                            this.arrayCumulatedItems = this.asyncCumulateItems === true ?
                                this.arrayCumulatedItems.concat(response.items) : response.items;

                            const dataToReturn = this.asyncCumulateItems ? this.arrayCumulatedItems : response.items;

                            // All conditions done? Restart!
                            this.asyncCumulateItems = false;

                            // Update TotalResults and return the choosen Data - 1st page or cumulated one:
                            this.asyncScrollerTotalResults = response.total_count;
                            this.asyncScrollerCurrentResults = dataToReturn.length;

                            return dataToReturn;
                        }
                    ))
        );
    }

    onInputBlur(evt) {
        // Handy if the user just (left) focus the input - as nothing will be trigger until he/she starts typing,
        // with this event, we can track "somebody" was here, even if didn't really lookup for anything...
        // Might be usefull for form's validation property 'ng-touched'! ;-)
        console.log('Lookup Input was just TOUCHED!', evt);
    }

    trigger_lookupAsyncScroller(searchStr) {
        console.warn('Input has CHANGED => HTTP Service triggered by "' + searchStr + '"!');
    }

    // tslint:disable:max-line-length
    // Check if the end of the list has been reached, by mouse/finger scrollDown:
    trigger_cumulatedLookupAsyncScroller = (evt) => {
        if (evt.endReached) {
            // Trigger another Service call, but, this time, to cumulate NEXT page with currently pulled items - current search user:
            this.asyncCumulateItems = true;
            this.asyncScrollerPageNumber = this.asyncScrollerPageNumber + 1;

            // this.lookupAsyncScroller(this.lookUpAsyncScrollerStr);
            // Won't work; it needs a "change", to trigger...

            // Instead, we trigger the [lookup]="lookupAsyncScroller" function by "changing" this.lookUpAsyncScrollerStr <uno-lookup /> Input trigger - <uno-lookup />'s behaviour:
            // const temp = this.lookUpAsyncScrollerStr;
            // this.lookUpAsyncScrollerStr = '';
            // setTimeout(() => {
            //     this.lookUpAsyncScrollerStr = temp; // will trigger lookupAsyncScroller() !
            // }, 300); // <= greater than <uno-lookup />'s default  Input() debounce = 200; - delay to consider a change in the <uno-lookup />'s Input

            // Better! It's resolved (triggering the Input so [lookup]="lookupAsyncScroller" can be refreshed) @ UNO library's component level!
            console.log('Scroll has ENDED => HTTP Service triggered with "' + this.lookUpAsyncScrollerStr + '"!');
        }
    }

    // Finally the user picked up a Github User:
    pickedAsyncScroller(pickedUser) {
        console.log('We have a Github choosen User: ', pickedUser);
        // Re-init:
        this.lookUpAsyncScrollerStr = '';
        this.asyncCumulateItems = false;
        this.asyncScrollerPageNumber = 1;
        this.arrayCumulatedItems = [];
    }
}
