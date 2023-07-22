import { Injectable } from '@angular/core';
import { SnackbarService } from 'src/app/components/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackbarService: SnackbarService) {
  }

  handleError(error: any): void {
    const errorMessage = error?.error?.message;
    console.log(error);
    console.error("Bir Hata Oluştu:", errorMessage || error);
    if (location.pathname != '/login') {
      this.snackbarService.openSnackBar(errorMessage || error);
    }
  }


}
