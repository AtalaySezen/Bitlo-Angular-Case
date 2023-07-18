import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProfileResponse, profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }


  GetProfileInformations() {
    return this.http.post<ProfileResponse>(environment.apiUrl + 'auth/me', {});
  }

}
