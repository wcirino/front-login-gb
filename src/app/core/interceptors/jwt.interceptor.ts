import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        // Log para saber qual URL está sendo chamada agora
        console.log(`📡 [INTERCEPTOR] Chamando URL: ${request.url}`);

        if (token) {
            // Log para confirmar que achamos o token no localStorage
            console.log('🔑 [INTERCEPTOR] Token encontrado! Injetando no Header...');

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Log para ver o Header montado (Cuidado pra não deixar isso em produção depois!)
            console.log('📤 [HEADER] Authorization:', request.headers.get('Authorization'));
        } else {
            // Se cair aqui na chamada de 'validar-permissao', o 403 é garantido
            console.warn('⚠️ [INTERCEPTOR] Nenhum token encontrado no localStorage para esta requisição.');
        }

        return next.handle(request);
    }
}
