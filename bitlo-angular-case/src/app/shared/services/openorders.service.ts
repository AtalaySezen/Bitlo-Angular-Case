import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/openOrders.model';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OpenordersService {

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }


  GetOpenOrders(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + 'auth/open-orders', {}).pipe(
      catchError((error) => {
        return throwError(() => this.errorHandlerService.handleError(error));
      })
    );
  }


}
