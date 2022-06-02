import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, TOKEN_KEY } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user_data: any;
  token: string;
  constructor(
    private http: HttpClient
  ) {
  }

  getToken() {
    this.token = localStorage.getItem(TOKEN_KEY);
  }

  get(endpoint: string, params: any, public_token: any = false) {
    this.getToken();
    const headers = !public_token ? new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    }) : {};
    return this.http.get<any>(API_URL + endpoint, { headers, params });
  }

  post(endpoint: string, data: any, withHeader: boolean = true) {
    this.getToken();
    const headers = withHeader ? new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    }) : {};
    return this.http.post<any>(API_URL + endpoint, data, { headers });
  }

  put(endpoint: string, data: any, public_token: boolean = false) {
    this.getToken();
    const headers = !public_token ? new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    }) : {};
    return this.http.put<any>(API_URL + endpoint, data, { headers });
  }

  delete(endpoint: string, id: string, public_token: boolean = false) {
    this.getToken();
    const headers = !public_token ? new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    }) : {};
    return this.http.delete<any>(API_URL + endpoint + '/' + id, { headers });
  }
}
