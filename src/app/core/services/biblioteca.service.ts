import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBiblioteca } from '../../interfaces/Biblioteca';
import { environment } from '../../../environments/environment';

const URL: string = `${environment.apiUrl}/vaporapp/api/Bibliotecas`;
const headers: HttpHeaders = new HttpHeaders().set(
  'Ocp-Apim-Subscription-Key',
  environment.apiKey
);

@Injectable({
  providedIn: 'root',
})
export class BibliotecaService {
  constructor(private http: HttpClient) {}

  getBiblioteca(id: string): Observable<IBiblioteca[]> {
    return this.http.get<IBiblioteca[]>(`${URL}/GetBibliotecaByUserId`, {
      params: {
        id: id,
      },
      headers: headers,
    });
  }

  postBiblioteca(biblioteca: IBiblioteca): Observable<IBiblioteca> {
    return this.http.post<IBiblioteca>(`${URL}`, biblioteca, {
      headers: headers,
    });
  }

  enPropiedad(idJuego: number, idUsuario: string): Observable<boolean> {
    return this.http.get<boolean>(`${URL}/enPropiedad`, {
      params: new HttpParams()
        .set('idJuego', idJuego)
        .set('idUsuario', idUsuario),
      headers: headers,
    });
  }
}
