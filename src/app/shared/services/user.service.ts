import { Injectable } from '@angular/core';
import { TOKEN_KEY } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
}
