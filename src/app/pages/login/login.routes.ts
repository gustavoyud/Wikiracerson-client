import { Route } from '@angular/router';
import { LoginComponent } from './login.component';

export const AUTH_ROUTES: Route[] = [
  {
    path: '',
    title: 'LittleSenna | Auth',
    component: LoginComponent,
  },
];
