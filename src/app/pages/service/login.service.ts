import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// Importando cada um do seu próprio arquivo
import { LoginRequest } from './model/login-request.dto';
import { LoginResponse } from './model/login-response.dto';
import { RetornoLogin } from './model/retorno-login.dto';
import { RecoverUsernameResponse } from './model/recover-username-response.dto';

import { AcessosResponse } from './model/acessos-response.dto';
import { ValidacaoAcessoDTO } from './model/validacao-acesso.dto';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API = `${environment.api_url}/auth`;
  private readonly API_ACESSOS = `${environment.api_url}/acessos`;

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API}/login`, request)
      .pipe(catchError(this.handleError));
  }

  requestCode(email: string): Observable<RetornoLogin> {
    const params = new HttpParams().set('email', email);
    return this.http
      .post<RetornoLogin>(`${this.API}/login-email`, null, { params })
      .pipe(catchError(this.handleError));
  }

  validateOtp(email: string, code: string): Observable<LoginResponse> {
    const params = new HttpParams().set('email', email).set('code', code);
    return this.http
      .post<LoginResponse>(`${this.API}/login-email/validate`, null, { params })
      .pipe(catchError(this.handleError));
  }

  forgotPassword(email: string): Observable<RetornoLogin> {
    const params = new HttpParams().set('email', email);
    return this.http
      .post<RetornoLogin>(`${this.API}/forgot-password`, null, { params })
      .pipe(catchError(this.handleError));
  }

  recoverUsername(email: string): Observable<RecoverUsernameResponse> {
    const params = new HttpParams().set('email', email);
    return this.http
      .get<RecoverUsernameResponse>(`${this.API}/recover-username`, { params })
      .pipe(catchError(this.handleError));
  }

  authenticate(request: LoginRequest): Observable<any> {
    return this.http
      .post<any>(`${this.API}/session/authenticate`, request, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  getSistemasHome(username: string): Observable<AcessosResponse> {
    return this.http
      .get<AcessosResponse>(`${this.API_ACESSOS}/${username}`)
      .pipe(catchError(this.handleError));
  }

  validarPermissao(username: string, url: string): Observable<ValidacaoAcessoDTO> {
    const params = new HttpParams()
      .set('username', username)
      .set('url', url);

    return this.http
      .get<ValidacaoAcessoDTO>(`${this.API_ACESSOS}/validar-permissao`, { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro no AuthService:', error);
    const message =
      error.error?.apierror?.message ||
      error.error?.message ||
      'Erro desconhecido no servidor.';
    return throwError(() => message);
  }
}
