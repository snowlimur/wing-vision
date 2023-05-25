import { Route } from '@angular/router';
import { AuthForgotPasswordComponent } from 'app/pages/auth/forgot-password/forgot-password.component';

export const authForgotPasswordRoutes: Route[] = [
    {
        path     : '',
        component: AuthForgotPasswordComponent
    }
];
