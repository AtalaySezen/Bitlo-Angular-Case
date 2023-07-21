import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authResponse } from '../models/authResponse.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  private authLocalStorageToken = `${environment.appName}-${environment.token}`;


  Login(identifier: string, password: string) {
    return this.http.post<authResponse>(environment.apiUrl + 'auth/login', {
      identifier,
      password
    })
  }

  SetStorageUser(token: any) {
    return localStorage.setItem(`${this.authLocalStorageToken}`, JSON.stringify(token));
  }

  Logout() {
    localStorage.removeItem(`${this.authLocalStorageToken}`);
    this.router.navigate(['login']);
  }

  get tokenValue() {
    const token = JSON.parse(localStorage.getItem('bitlo-token') || '{}');
    return token;
  }


  get checkToken() {
    return Object.keys(this.tokenValue).length !== 0;
  }








}
