import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json'
            // , 'Authorization': 'my-auth-token'
        }
    )
};

export interface RowData {
    id: number;
    title: string;
    author: string;
    rating: number;
    year_published: number;
}

// =======================

// Always NEEDED:
export interface Paging {
    page: number;
    perPage: number;
}

// When user sets Filtering, on one or more columns:
export interface Filter {
    field: string;
    search: string;
}
// When user sets Sort in any (one) column:
export interface ColumnSort {
    field: string;
    direction: string;
}


@Injectable()
export class NanoService {

    urlAPI = 'http://localhost:3002/books';
    objPaging: Paging;

    constructor(private http: HttpClient) { }

    getData(arrayObjFilter: Filter[], arrayObjSort: ColumnSort[], pagingObj: Paging): Observable<RowData[]> {
        // It always comes and it's always needed... the (current) PAGING!
        this.objPaging = pagingObj;

        return this.http.get<RowData[]>(
            this.urlAPI,
            // { params: new HttpParams().set(field, search) }
            { params: this.createRequesParams(arrayObjFilter, arrayObjSort) }
        )
            .pipe(
                // retry(3), // retry a failed request up to 3 times
                catchError(this.handleError)
            );
    }

    // Use Observable.forkJoin() to run multiple concurrent http.get() requests.
    // The entire operation will result in an error state if any single request fails.
    // getBooksAndMovies() {
    //     return Observable.forkJoin(
    //     this.http.get('/api/books'),
    //     this.http.get('/api/movies')
    //     );
    // }

    createData(nanoDataRow: RowData): Observable<RowData> {
        const body = JSON.stringify(nanoDataRow);
        return this.http.post<RowData>(`${this.urlAPI}/`, body, httpOptions)
            .pipe(catchError(this.handleError));
    }

    updateData(nanoDataRow: RowData): Observable<RowData> {
        const body = JSON.stringify(nanoDataRow);
        return this.http.put<RowData>(`${this.urlAPI}/${nanoDataRow.id}`, body, httpOptions)
            .pipe(catchError(this.handleError));
    }

    deleteData(nanoDataRow: RowData): Observable<RowData> {
        return this.http.delete<RowData>(`${this.urlAPI}/${nanoDataRow.id}`)
            .pipe(catchError(this.handleError));
    }

    // =========================================================
    // AUX functions
    // =========================================================
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }


    // =========================================================
    // AUX functions for URL parameters, @ getData() method:
    // =========================================================
    private createRequesParams(arrayObjFilter: Filter[] = null, arrayObjSort: ColumnSort[] = null): HttpParams {
        let httpParams = new HttpParams();

        if (arrayObjSort.length > 0) {   // Do Sorting, by ONE (so far) column passed in 1st element of Array of sort fields:
            httpParams = this.addSortRequestParams(httpParams, arrayObjSort);
        }
        if (arrayObjFilter.length > 0) {    // Do Filtering, with ALL collumns having a search string, passed on Array of columns
            httpParams = this.addFilterRequestParams(httpParams, arrayObjFilter);
        }
        // Add, last but not least, the ALWAYS NEEDED current page pagination:
        return this.addPagerRequestParams(httpParams);
    }

    private addSortRequestParams(httpParams: HttpParams, arrayObjSort: ColumnSort[]): HttpParams {
        // So far, "objSort", allthough na array, only brings 1 column sort at a time. Maybe later we can get sort of sorting... ;-)
        httpParams = httpParams.set('_sort', arrayObjSort[0].field);
        httpParams = httpParams.set('_order', arrayObjSort[0].direction.toUpperCase());
        return httpParams;
    }

    private addFilterRequestParams(httpParams: HttpParams, arrayObjFilter: Filter[]): HttpParams {
        arrayObjFilter.forEach(
            // @ "json-server" Server the sufix '_lilke' @ field, allows wild search (not "exactly")
            (eachFilter: Filter) => {
                if (eachFilter.search !== '') {
                    httpParams = httpParams.set(eachFilter.field + '_like', eachFilter.search);
                }
            }
        );
        return httpParams;

    }

    protected addPagerRequestParams(httpParams: HttpParams): HttpParams {
        httpParams = httpParams.set('_page', this.objPaging.page.toString());
        httpParams = httpParams.set('_limit', this.objPaging.perPage.toString());

        return httpParams;
    }
}
