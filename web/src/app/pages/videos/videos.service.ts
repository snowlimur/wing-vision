import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, switchMap, throwError} from "rxjs";
import {AuthUtils} from "app/core/auth/auth.utils";
import {UserService} from "app/core/user/user.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class VideosService {
    constructor(
        private _httpClient: HttpClient
    ) {
    }

    one(id: number): Observable<any> {
        return this._httpClient.get(environment.apiUrl + `/videos/${id}`).pipe(
            switchMap((response: any) => {
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    list(): Observable<any> {
        return this._httpClient.get(environment.apiUrl + `/videos/`).pipe(
            switchMap((response: any) => {
                // Return a new observable with the response
                return of(response);
            })
        );
    }
}
