import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient) { }


  GetProfileInformations() {
    return this.http.get<any>(environment.apiUrl + 'markets');
  }

}
