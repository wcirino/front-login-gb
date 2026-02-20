import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { LoginRequest } from '../service/model/login-request.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  mensagem: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  // Inicializa o formulário com validações básicas
  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Mostra os erros de "campo obrigatório"
      return;
    }

    const dadosLogin: LoginRequest = this.loginForm.value;

    this.loginService.login(dadosLogin).subscribe({
      next: (res) => {
        // Sucesso: Salva o token e o username
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);

        console.log('Login realizado com sucesso!', res);

        // Redireciona para a home ou dashboard (ajuste a rota conforme seu projeto)
        this.router.navigate(['/']);
      },
      error: (err) => {
        // Erro: O handleError do service já tratou, aqui a gente só exibe
        this.mensagem = err;
      }
    });
  }
}
