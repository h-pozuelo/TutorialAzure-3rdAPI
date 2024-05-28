import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from '../../interfaces/Transaccion';
import { environment } from '../../../environments/environment';

const URL: string = `${environment.apiUrl}/vaporapp`;
const headers: HttpHeaders = new HttpHeaders().set(
  'Ocp-Apim-Subscription-Key',
  environment.apiKey
);

@Injectable({
  providedIn: 'root',
})
export class TransaccionesService {
  constructor(private http: HttpClient) {}

  getTransaccionesUsuario(idUsuario: string): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(`${URL}/api/Transacciones/idUsuario`, {
      params: new HttpParams().set('idUsuario', idUsuario),
      headers: headers,
    });
  }

  createTransaccion(transaccion: Transaccion): Observable<Transaccion> {
    return this.http.post<Transaccion>(
      `${URL}/api/Transacciones/`,
      transaccion,
      {
        headers: headers,
      }
    );
  }

  createTransaccionCompleta(
    transaccion: Transaccion,
    appidList: number[]
  ): Observable<Transaccion> {
    return this.http.post<Transaccion>(
      `${URL}/api/Transacciones/appidList`,
      transaccion,
      {
        params: new HttpParams().set('appidList', appidList.join(',')),
        headers: headers,
      }
    );
  }
}
