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
  private authLocalStorageToken = `${environment.appName}-${environment.USERDATA_KEY}`;


  Login(identifier: string, password: string) {
    return this.http.post<authResponse>(environment.apiUrl + 'auth/login', {
      identifier,
      password
    })
  }

  SetStorageUser(user: any) {
    return localStorage.setItem(`${this.authLocalStorageToken}`, JSON.stringify(user));
  }

  Logout() {
    localStorage.removeItem(`${this.authLocalStorageToken}`);
    this.router.navigate(['login']);
  }

  get tokenValue() {
    const token = JSON.parse(localStorage.getItem('bitlo-token') || '{}');
    return token;
  }








}
