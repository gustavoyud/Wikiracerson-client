import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  public get(url: string, params?: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${url}`, {
      params,
      observe: 'response',
    });
  }
  public post(url: string, data?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${url}`, data);
  }
  public put(url: string, params?: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${url}`, params);
  }
  public httpDelete(url: string, params?: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${url}`, { params });
  }
}
