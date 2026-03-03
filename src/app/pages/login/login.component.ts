import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../service/login.service';
import { LoginRequest } from '../service/model/login-request.dto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  mensagem: string = '';
  redirectUri: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();

    // pega o redirect_uri que veio do sistema cliente
    this.route.queryParams.subscribe(params => {
      this.redirectUri = params['redirect_uri'];
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const dadosLogin: LoginRequest = this.loginForm.value;

    this.loginService.authenticate(dadosLogin).subscribe({
      next: () => {
        console.log("Url :", `${environment.api_port_url}/auth/authorize?redirect_uri=${this.redirectUri}`);
        window.location.href =
          `${environment.api_port_url}/auth/authorize?redirect_uri=${this.redirectUri}`;

      },
      error: (err) => {
        this.mensagem = err;
      }
    });
  }
}
