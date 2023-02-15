import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Articles } from 'src/app/pages/lobby/lobby.component';

export interface Player {
  meuNome?: string;
  id?: number;
  isDonoDaSala?: boolean;
  history?: any[];
  isControlF?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  public players: Player[] = [];
  public articles$ = new BehaviorSubject(undefined);

  public gameIsRunning() {
    return !!this.articles$.value;
  }
  public gameIsRunning$ = this.articles$.pipe(map((items) => !!items))

  constructor() {}
}
