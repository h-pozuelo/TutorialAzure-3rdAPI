import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JuegoTransaccion } from '../../interfaces/juego-transaccion';
import { environment } from '../../../environments/environment';

const URL: string = `${environment.apiUrl}/vaporapp`;
const headers: HttpHeaders = new HttpHeaders().set(
  'Ocp-Apim-Subscription-Key',
  environment.apiKey
);

@Injectable({
  providedIn: 'root',
})
export class JuegosTransaccionesService {
  constructor(private http: HttpClient) {}

  getJuegosTransaccion(idTransaccion: number): Observable<JuegoTransaccion[]> {
    return this.http.get<JuegoTransaccion[]>(
      `${URL}/api/JuegosTransacciones/idTransaccion`,
      {
        params: new HttpParams().set('idTransaccion', idTransaccion),
        headers: headers,
      }
    );
  }

  createJuegoTransaccion(
    juegoTransaccion: JuegoTransaccion
  ): Observable<JuegoTransaccion> {
    return this.http.post<JuegoTransaccion>(
      `${URL}/api/JuegosTransacciones/`,
      juegoTransaccion,
      {
        headers: headers,
      }
    );
  }
}
