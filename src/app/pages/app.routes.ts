import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lobby',
  },
  {
    path: 'lobby',
    loadChildren: () => import('./lobby/lobby.routes').then(mod => mod.LOBBY_ROUTES),
  },
];
