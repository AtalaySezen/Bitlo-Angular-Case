import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handleError(error: any): void {
    const errorMessage = error?.error?.message;
    console.error("Bir Hata Oluştu:", errorMessage || error);
    
  }

}
