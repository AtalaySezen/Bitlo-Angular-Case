import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/openOrders.model';

@Injectable({
  providedIn: 'root'
})
export class OpenordersService {

  constructor(private http: HttpClient) { }


  GetProfileInformations() {
    return this.http.post<ApiResponse>(environment.apiUrl + 'auth/open-orders', {});
  }


}
