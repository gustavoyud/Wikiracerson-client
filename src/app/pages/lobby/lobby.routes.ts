import { Route } from '@angular/router';
import { LobbyComponent } from './lobby.component';

export const LOBBY_ROUTES: Route[] = [
  {
    path: '',
    title: 'LittleSenna | Lobby',
    component: LobbyComponent,
  },
];
