import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProfileResponse, profile } from '../models/profile.model';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  GetProfileInformations(): Observable<ProfileResponse> {
    return this.http.post<ProfileResponse>(environment.apiUrl + 'auth/me', {})
  }

}
