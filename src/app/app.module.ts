import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarAcessoComponent } from './pages/recuperar-acesso/recuperar-acesso.component';
import { RecuperarLoginComponent } from './pages/recuperar-login/recuperar-login.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './pages/home/home.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecuperarAcessoComponent,
    RecuperarLoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
