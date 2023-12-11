import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthInterface } from '../interface/auth-interface';
import { TokenInterface } from '../interface/token-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:4201/auth';

  getToken(informacion: AuthInterface | any) {
    return this.http.post<TokenInterface>(this.baseUrl, informacion);
  }

  logout() {
    localStorage.removeItem('token_access');
  }
}
