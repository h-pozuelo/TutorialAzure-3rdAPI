import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsDto } from '../../interfaces/user-details-dto';
import { environment } from '../../../environments/environment';

const URL: string = `${environment.apiUrl}/vaporapp`;
const headers: HttpHeaders = new HttpHeaders().set(
  'Ocp-Apim-Subscription-Key',
  environment.apiKey
);

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  getUsuario(id: string): Observable<UserDetailsDto> {
    return this.http.get<UserDetailsDto>(`${URL}/api/Accounts/id`, {
      params: new HttpParams().set('id', id),
      headers: headers,
    });
  }

  updateUsuario(id: string, userDetailsDto: UserDetailsDto) {
    return this.http.put(`${URL}/api/Accounts/id`, userDetailsDto, {
      params: new HttpParams().set('id', id),
      headers: headers,
    });
  }
}
