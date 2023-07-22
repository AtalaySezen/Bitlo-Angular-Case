import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handleError(error: any): void {
    console.error("Bir Hata Oluştu:", error.error.message);
  }

}
