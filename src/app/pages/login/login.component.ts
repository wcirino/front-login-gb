import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { LoginRequest } from '../service/model/login-request.dto';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  mensagem: string = '';
  redirectUri: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.route.queryParams.subscribe((params) => {
      this.redirectUri = params['redirect_uri'];
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const dadosLogin: LoginRequest = this.loginForm.value;

    try {
      const res = await firstValueFrom(
        this.loginService.authenticate(dadosLogin),
      );

      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.username);
      localStorage.setItem('sistemas', JSON.stringify(res.sistemas));

      if (this.redirectUri) {
        const temPermissao = res.sistemas.some((s: any) =>
          this.redirectUri.startsWith(s.url),
        );

        if (temPermissao) {
          this.utilService.notifyLogin();
          window.location.href = `${environment.api_url}/auth/authorize?redirect_uri=${this.redirectUri}`;
        } else {
          this.mensagem =
            'Você não possui permissão para acessar este portal específico.';
          this.limparSessao();
        }
      } else {
        this.router.navigate(['/home']);
        this.utilService.notifyLogin();
      }
    } catch (err: any) {
      this.limparSessao();
      this.mensagem = err;
    }
  }

  private limparSessao() {
    localStorage.clear();
  }
}
