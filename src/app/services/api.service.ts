import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from '../components/login/login.component';

export interface LoginResponse {
  message: string;
  messageCode: string;
  statusCode: number;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login({ email, password }: LoginData) {
    return this.http.post<LoginResponse>('https://login-hacking.herokuapp.com/api/v1/login', {
      user: email,
      passwd: password,
    });
  }
}
