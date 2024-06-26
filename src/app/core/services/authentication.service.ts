import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RegistrationResponse,
  UserForRegistrationDto,
  UserForAuthenticationDto,
  AuthResponseDto,
} from '../../interfaces/user-for-registration-dto';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
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
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  registerUser(
    usuario: UserForRegistrationDto
  ): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(
      `${URL}/api/Accounts/Registration`,
      usuario,
      {
        headers: headers,
      }
    );
  }

  // servicio para el login
  loginUser(usuario: UserForAuthenticationDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(
      `${URL}/api/Accounts/Login`,
      usuario,
      {
        headers: headers,
      }
    );
  }

  // Método para saber si está autenticado el usuario
  sendAuthStateChangeNotification(isAuthenticated: boolean) {
    this.authChangeSub.next(isAuthenticated);
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification(false);
  }

  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  // Método para obtener del AuthResponseDto los detalles de usuario
  getUserDetails() {
    const token = localStorage.getItem('token') as string;
    const decodedToken = this.jwtHelper.decodeToken(token);
    const userDetails: UserDetailsDto = {
      id: decodedToken['Id'],
      fechaRegistro: new Date(Date.parse(decodedToken['FechaRegistro'])),
      nomApels: decodedToken['NomApels'],
      saldo: Number(decodedToken['Saldo']),
      userName: decodedToken['Username'],
      email: decodedToken['Email'],
    };

    return userDetails;
  }
}
