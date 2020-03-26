import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // variable q guardara el JWT
  private readonly authProvider: (username: string, password: string) =>  Observable<IServerAuthResponse>;

  // iniciamos el constructor y asignamos el JWT a la variable authProvider
  constructor(private httpClient: HttpClient) {
    this.authProvider = this.userAuthProvider;
  }

  // se realiza peticion de autenticacion al API
  private userAuthProvider( username: string, password: string): Observable<IServerAuthResponse>{
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post<IServerAuthResponse>(`${environment.urlService}/usuario/authenticate`, {username: username, password: password})
  }

  // decodificamos el JWT y obtenemos los datos del usuario
  login(username: string, password: string): Observable<IAuthStatus>{
    this.logout();

    const loginResponse = this.authProvider(username, password).pipe(
      map(value => {
        const result = decode(value.token);
        return result as IAuthStatus;
      })
    );
    return loginResponse;
  }

  logout(){

  }
}

// interface del response del API (Modelo Usuario)
export interface IAuthStatus {
  id: number;
  username: string;
  firtname: string;
  lastname: string;
}

// JWT que retorna el response del API
interface IServerAuthResponse {
  token: string;
}

const defaultAuthStatus: IAuthStatus = {
  id: null,
  username: null,
  firtname: null,
  lastname: null
}

