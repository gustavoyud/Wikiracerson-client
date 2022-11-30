import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { environment } from 'src/environments/environment';

type SocketConfiguration = Partial<ManagerOptions & SocketOptions>;

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;

  constructor() {}

  public init(url: string, config?: SocketConfiguration): void {
    this.socket = io(`${environment.apiUrl}/${url}`, config);
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
