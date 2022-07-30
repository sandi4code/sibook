import { Injectable } from '@angular/core';
import { TOKEN_KEY } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {
  isLoggedIn() {
    let token = localStorage.getItem(TOKEN_KEY);
    return token ?? false;
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  setUserInfo(data: any) {
    localStorage.setItem('user_info', JSON.stringify({ name: data.name, phone: data.phone }));
  }

  getUserInfo() {
    let user = JSON.parse(localStorage.getItem('user_info'));
    return user;
  }

  getUser() {
    return this.get('user', {});
  }
}
