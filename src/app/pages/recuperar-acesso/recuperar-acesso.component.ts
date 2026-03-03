import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecuperarAcessoService } from '../service/recuperar-acesso.service';

@Component({
  selector: 'app-recuperar-acesso',
  templateUrl: './recuperar-acesso.component.html',
  styleUrls: ['./recuperar-acesso.component.scss']
})
export class RecuperarAcessoComponent implements OnInit {

  acessoForm!: FormGroup;
  mensagem: string = '';
  emailDestino: string | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: RecuperarAcessoService
  ) { }

  ngOnInit(): void {
    this.acessoForm = this.fb.group({
      username: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.acessoForm.invalid) {
      this.acessoForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.mensagem = '';
    this.emailDestino = null;

    const username = this.acessoForm.get('username')?.value;

    this.service.solicitarRedefinicao(username).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.codigo === 1) {
          this.emailDestino = res.email;
          this.mensagem = res.msg;
        } else {
          this.mensagem = res.msg || 'Usuário não encontrado.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.mensagem = 'Servidor indisponível ou erro na redefinição.';
      }
    });
  }
}
