import { Route } from '@angular/router';
import { AuthResetPasswordComponent } from 'app/pages/auth/reset-password/reset-password.component';

export const authResetPasswordRoutes: Route[] = [
    {
        path     : '',
        component: AuthResetPasswordComponent
    }
];
