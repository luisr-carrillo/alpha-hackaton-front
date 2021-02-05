import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RestriccionGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('isLogged');
    if (!user) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
