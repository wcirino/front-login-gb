import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecuperarAcessoRequestDto } from './model/recuperar-acesso-request.dto';
import { RecuperarAcessoResponseDto } from './model/recuperar-acesso-response.dto';

@Injectable({
  providedIn: 'root'
})
export class RecuperarAcessoService {

  private readonly API = `${environment.api_url}/auth/forgot-password`;

  constructor(private http: HttpClient) { }

  solicitarRedefinicao(username: string): Observable<RecuperarAcessoResponseDto> {
    const request: RecuperarAcessoRequestDto = { username };

    return this.http.post<RecuperarAcessoResponseDto>(this.API, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    const message = error.error?.msg || 'Erro ao processar solicitação de senha.';
    return throwError(() => new Error(message));
  }
}
