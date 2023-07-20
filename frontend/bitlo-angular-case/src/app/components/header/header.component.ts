import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showLoginButton: boolean = false;
  showwLogoutButton: boolean = false;

  constructor(private authService: AuthService) {
    this.showwLogoutButton = Object.keys(this.authService.tokenValue).length !== 0;
    this.showLoginButton = !this.showwLogoutButton;
  }





}
