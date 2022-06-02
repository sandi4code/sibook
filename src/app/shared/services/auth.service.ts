import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

interface UserLogin {
  phone: string
  password: string
}

interface UserRegister {
  name: string
  phone: string
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  login(data: UserLogin) {
    return this.post('auth/login', data, false).toPromise();
  }

  register(data: UserRegister) {
    return this.post('auth/register', data, false).toPromise();
  }
}
