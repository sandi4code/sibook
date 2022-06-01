import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private platform: Platform,
    private userService: UserService,
    private router: Router
  ) { }

  async canActivate() {
    return this.platform.ready().then(() => {
      if (this.userService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/auth']);
        return false;
      }
    });
  }
}
