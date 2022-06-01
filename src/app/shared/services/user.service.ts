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
}
