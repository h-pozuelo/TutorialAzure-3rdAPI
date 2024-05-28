import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resenya } from '../../interfaces/Resenya';
import { environment } from '../../../environments/environment';

const URL: string = `${environment.apiUrl}/vaporapp`;
const headers: HttpHeaders = new HttpHeaders().set(
  'Ocp-Apim-Subscription-Key',
  environment.apiKey
);

@Injectable({
  providedIn: 'root',
})
export class ResenyasService {
  constructor(private http: HttpClient) {}

  getResenyasJuego(idJuego: number): Observable<Resenya[]> {
    return this.http.get<Resenya[]>(`${URL}/api/Resenyas/idJuego`, {
      params: new HttpParams().set('idJuego', idJuego),
      headers: headers,
    });
  }

  createResenya(resenya: Resenya): Observable<Resenya> {
    return this.http.post<Resenya>(`${URL}/api/Resenyas`, resenya, {
      headers: headers,
    });
  }
}
