import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  get isLogged() {
    return this.loggedIn.asObservable();
  }

  notifyLogin() {
    this.loggedIn.next(true);
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('sistemas');

    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
