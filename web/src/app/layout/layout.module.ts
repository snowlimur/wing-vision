import {NgModule} from '@angular/core';
import {LayoutComponent} from 'app/layout/layout.component';
import {EmptyLayoutModule} from 'app/layout/layouts/empty/empty.module';
import {ThinLayoutModule} from 'app/layout/layouts/thin/thin.module';
import {SharedModule} from 'app/shared/shared.module';

const layoutModules = [
    EmptyLayoutModule,
    ThinLayoutModule
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        SharedModule,
        ...layoutModules
    ],
    exports: [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule {
}
