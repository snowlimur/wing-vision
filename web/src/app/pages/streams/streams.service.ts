import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, switchMap, throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class StreamsService {
    constructor(
        private _httpClient: HttpClient
    ) {
    }

    createStream(form: { name: string, type: string, rtmp: string }): Observable<any> {
        return this._httpClient.post(environment.apiUrl + "/streams", form).pipe(
            switchMap((response: any) => {
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    one(id: number): Observable<any> {
        return this._httpClient.get(environment.apiUrl + `/streams/${id}`).pipe(
            switchMap((response: any) => {
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    list(): Observable<any> {
        return this._httpClient.get(environment.apiUrl + `/streams/`).pipe(
            switchMap((response: any) => {
                // Return a new observable with the response
                return of(response);
            })
        );
    }
}
