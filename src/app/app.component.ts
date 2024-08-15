import { Component } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'food';
  constructor(private router : Router) { }

  isAdminPage() : boolean {
    const snapshot : RouterStateSnapshot = this.router.routerState.snapshot;
    const url : string = snapshot.url;
    return url.startsWith('/admin');
  }

  isLoginPage() : boolean {
    const snapshot : RouterStateSnapshot = this.router.routerState.snapshot;
    const url : string = snapshot.url;
    return url.startsWith('/login');
  }

  isRegisterPage() : boolean {
    const snapshot : RouterStateSnapshot = this.router.routerState.snapshot;
    const url : string = snapshot.url;
    return url.startsWith('/register');
  }

  isHomePage() : boolean {
    const snapshot : RouterStateSnapshot = this.router.routerState.snapshot;
    const url : string = snapshot.url;
    return url.startsWith('/home');
  }

  isMenuPage() : boolean {
    const snapshot : RouterStateSnapshot = this.router.routerState.snapshot;
    const url : string = snapshot.url;
    return url.startsWith('/menu');
  }

}
