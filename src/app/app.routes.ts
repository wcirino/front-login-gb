import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { RecuperarAcessoComponent } from './pages/recuperar-acesso/recuperar-acesso.component';
import { RecuperarLoginComponent } from './pages/recuperar-login/recuperar-login.component';
//import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'recuperar-acesso', component: RecuperarAcessoComponent },
  { path: 'recuperar-login', component: RecuperarLoginComponent },
  //{ path: 'logado', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
