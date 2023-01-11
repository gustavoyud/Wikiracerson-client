import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketService } from './web-socket.service';

export interface AuthConfig {
  meuNome: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  constructor(private ws: WebSocketService) {}

  public login(auth: AuthConfig) {
    this.ws.init('lobby', { auth });
  }

  public emitPlayers(): void {
    this.ws.emit('getPlayers');
  }

  public getPlayers(): Observable<any> {
    return this.ws.listen('currentLobby');
  }

  public newPlayer(): Observable<any> {
    return this.ws.listen('newPlayer');
  }

  public isDonoDaSala(): Observable<boolean> {
    return this.ws.listen('isDonoDaSala');
  }

  public startGame(articles: any): void {
    this.ws.emit('gameStarted', articles);
  }

  public emitHack(): void {
    this.ws.emit('isHackerzaum');
  }

  public hasHackerzaum(): Observable<any> {
    return this.ws.listen('hasHackerzaum');
  }

  public getArticles(): Observable<any> {
    return this.ws.listen('gameHasStarted');
  }

  public updateHistory(history: any): void {
    this.ws.emit('updateHistory', history);
  }

  public gameFinished(): Observable<any> {
    return this.ws.listen('gameHasFinished');
  }

  public hasWinner(): void {
    this.ws.emit('hasWinner');
  }
}
