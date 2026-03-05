import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username: string = '';
  sistemas: any[] = [];

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Usuário';

    const sistemasSalvos = localStorage.getItem('sistemas');
    if (sistemasSalvos) {
      this.sistemas = JSON.parse(sistemasSalvos);
    }
  }

  irParaSistema(urlSistema: string) {
    const redirect = `${urlSistema}/callback`;
    window.location.href = `${environment.api_url}/auth/authorize?redirect_uri=${redirect}`;
  }
}
