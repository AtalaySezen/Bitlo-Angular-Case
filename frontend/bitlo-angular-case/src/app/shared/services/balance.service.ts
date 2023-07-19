import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { balanceModel } from '../models/balance.model';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { }

  GetBalanceInformation() {
    return this.http.post<any[]>(environment.apiUrl + 'auth/balances', {});
  }

}
