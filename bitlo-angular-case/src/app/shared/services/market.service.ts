import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MarketData } from '../models/markets.model';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient) { }

  GetProfileInformations() {
    return this.http.get<MarketData[]>(environment.apiUrl + 'markets');
  }

}
