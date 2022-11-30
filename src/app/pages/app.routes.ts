import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadChildren: () => import('./login/login.routes').then(mod => mod.AUTH_ROUTES)
  },
  {
    path: 'lobby',
    loadChildren: () => import('./lobby/lobby.routes').then(mod => mod.LOBBY_ROUTES),
  },
];
