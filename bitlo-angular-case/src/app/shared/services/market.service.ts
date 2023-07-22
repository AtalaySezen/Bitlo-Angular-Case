import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MarketData } from '../models/markets.model';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  GetMarketDatas(): Observable<MarketData[]> {
    return this.http.get<MarketData[]>(environment.apiUrl + 'markets').pipe(
      catchError((error) => {
        return throwError(() => this.errorHandlerService.handleError(error));
      })
    );
  }


}
