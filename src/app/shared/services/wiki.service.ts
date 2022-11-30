import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class WikiService {
  constructor(private http: HttpClientService) {}

  public random(): Observable<any> {
    return this.http.get('wiki/random');
  }

  public parser(title: string): Observable<any> {
    return this.http.get('wiki/parser', { titles: title });
  }
}
