import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecuperarLoginService } from '../service/recuperar-login.service';

@Component({
  selector: 'app-recuperar-login',
  templateUrl: './recuperar-login.component.html',
  styleUrls: ['./recuperar-login.component.scss'],
})
export class RecuperarLoginComponent implements OnInit {
  recuperarForm!: FormGroup;
  mensagem: string = '';
  public usernameRecuperado: string | null | undefined = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private recuperarService: RecuperarLoginService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.recuperarForm.invalid) {
      this.recuperarForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.mensagem = '';
    this.usernameRecuperado = null;

    const email = this.recuperarForm.get('email')?.value;

    this.recuperarService.recuperar(email).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.codigo === 1) {
          this.usernameRecuperado = res.username ?? null;
          this.mensagem = '';
        } else if (res.codigo === 0) {
          this.usernameRecuperado = null;
          this.mensagem = res.mensagem || 'Login não encontrado.';
        } else {
          this.usernameRecuperado = null;
          this.mensagem = 'Erro inesperado no processamento do servidor.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.usernameRecuperado = null;
        this.mensagem = 'Erro de comunicação: O servidor está indisponível.';
      },
    });
  }
}
