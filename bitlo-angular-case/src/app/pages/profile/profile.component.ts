import { Component } from '@angular/core';
import { ProfileResponse, profile } from 'src/app/shared/models/profile.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProfileService } from 'src/app/shared/services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileData: {};
  loader: boolean = false;
  checkUserLogged: boolean = false;
  displayedColumns: string[] = ['createdBy', 'from', 'to'];

  constructor(private profileService: ProfileService, private authService: AuthService) {
    this.checkUserLogged = Object.keys(this.authService.tokenValue).length !== 0;
    this.getProfileData();
  }


  getProfileData() {
    this.loader = true;
    this.profileService.GetProfileInformations().subscribe({
      next: (data: ProfileResponse) => {
        if (data.message === 'Auth success') {
          this.profileData = data.me;
        }
        this.loader = false;
      }
    });
  }




}
