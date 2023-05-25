import {Injectable} from '@angular/core';
import {cloneDeep} from 'lodash-es';
import {FuseNavigationItem} from '@fuse/components/navigation';
import {FuseMockApiService} from '@fuse/lib/mock-api';
import {navigation} from 'app/mock-api/common/navigation/data';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi {
    private readonly _navigation: FuseNavigationItem[] = navigation;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() => {
                return [
                    200,
                    {
                        compact: cloneDeep(this._navigation),
                        default: cloneDeep(this._navigation),
                        futuristic: cloneDeep(this._navigation),
                        horizontal: cloneDeep(this._navigation)
                    }
                ];
            });
    }
}
