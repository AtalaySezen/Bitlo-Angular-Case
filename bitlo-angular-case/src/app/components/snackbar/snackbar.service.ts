import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(message: string|any, snackType?: any, action?: string) {
    const _snackType: any =
      snackType !== undefined ? snackType : 'Success';
    this.snackBar.open(message, action, {
      horizontalPosition: 'end',
      duration: 1500,
      verticalPosition: 'top',
      panelClass: _snackType
    });
  }

  dismiss() {
    this.snackBar.dismiss();
  }


}
