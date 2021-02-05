import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements DoCheck {
  user: any;
  title = 'alpha-hackaton-front';

  constructor(public route: ActivatedRoute, private router: Router) {}

  ngDoCheck() {
    this.user = localStorage.getItem('isLogged');
  }

  logout() {
    this.user = null;
    localStorage.removeItem('isLogged');
    this.router.navigateByUrl('/login');
  }
}
