import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecuperarLoginResponseDto } from './model/recuperar-login-response.dto';

@Injectable({
  providedIn: 'root'
})
export class RecuperarLoginService {

  private readonly API = `${environment.api_url}/auth/recover-username`;

  constructor(private http: HttpClient) { }

  recuperar(email: string): Observable<RecuperarLoginResponseDto> {
    const params = new HttpParams().set('email', email);

    return this.http.post<RecuperarLoginResponseDto>(this.API, null, { params })
      .pipe(
        map(res => {
          if (res.codigo !== 0 && res.codigo !== 1) {
            throw new Error(res.mensagem || 'Erro ao recuperar login.');
          }
          return res;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro no RecuperarLoginService:', error);
    const message = error.error?.message || 'Erro na comunicação com o servidor.';
    return throwError(() => new Error(message));
  }
}
