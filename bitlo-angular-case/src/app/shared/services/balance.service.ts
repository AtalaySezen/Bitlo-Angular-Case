import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { balanceModel } from '../models/balance.model';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  GetBalanceInformation(): Observable<balanceModel[]> {
    return this.http.post<balanceModel[]>(environment.apiUrl + 'auth/balances', {}).pipe(
      catchError((error) => {
        return throwError(() => this.errorHandlerService.handleError(error));
      })
    );
  }



}
