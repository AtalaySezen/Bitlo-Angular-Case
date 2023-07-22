import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authResponse } from '../models/authResponse.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private errorHandlerService: ErrorHandlerService) { }
  private authLocalStorageToken = `${environment.appName}-${environment.token}`;


  Login(identifier: string, password: string): Observable<authResponse> {
    return this.http.post<authResponse>(environment.apiUrl + 'auth/login', {
      identifier,
      password
    }).pipe(
      catchError((error) => {
        return throwError(() => this.errorHandlerService.handleError(error));
      })
    );
  }

  SetStorageUser(token: any) {
    return localStorage.setItem(`${this.authLocalStorageToken}`, JSON.stringify(token));
  }

  Logout() {
    localStorage.removeItem(`${this.authLocalStorageToken}`);
    this.router.navigate(['login']);
  }

  get tokenValue(): string {
    const token = JSON.parse(localStorage.getItem('bitlo-token') || '{}');
    return token;
  }


  get checkToken(): boolean {
    return Object.keys(this.tokenValue).length !== 0;
  }





}
