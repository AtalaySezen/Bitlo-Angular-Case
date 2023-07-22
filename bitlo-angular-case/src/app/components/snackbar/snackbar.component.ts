import { Component, Inject } from '@angular/core';
import { MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  styles: [
    `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }
  `,
  ],
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatSnackBarModule, MatFormFieldModule],
})

export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private snackbarService: SnackbarService) { }

  dismiss() {
    this.snackbarService.dismiss();
  }


}
