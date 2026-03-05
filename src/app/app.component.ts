import { Component } from '@angular/core';
import { UtilService } from './pages/service/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'login-front';
  isLogged$ = this.utilService.isLogged;

  constructor(private utilService: UtilService) {}

  onLogout() {
    this.utilService.logout();
  }
}
