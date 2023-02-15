import { Injectable } from '@angular/core';
import { combineLatest, Observable, share, skip, Subject, tap, zip } from 'rxjs';
import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { environment } from 'src/environments/environment';

type SocketConfiguration = Partial<ManagerOptions & SocketOptions>;

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;

  private onConnect$ = new Subject<void>();
  private onDisconnect$ = new Subject<void>();

  public connectionReestablished$ = zip([
    this.onConnect$.pipe(skip(1)),
    this.onDisconnect$,
  ]).pipe(
    share(),
    tap((a) => console.log(a)), // TODO: send players states back to server
  )

  constructor() {}

  public init(url: string, config?: SocketConfiguration): void {
    this.socket = io(`${environment.apiUrl}/${url}`, config);
    this.socket.on('connect', () => {
      console.warn('connected!')
      this.onConnect$.next();
    })
    this.socket.on('disconnect', (e) => {
      console.warn('disconnected!')
      this.onDisconnect$.next();
    })
  }

  public listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  public emit(eventName: string, data?: any): void {
    this.socket.emit(eventName, data);
  }
}
