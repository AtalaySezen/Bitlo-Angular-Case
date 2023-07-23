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
  displayedColumns: string[] = ['createdBy', 'from', 'to'];
  loader: boolean = false;
  checkUserLogged: boolean = false;
  profileData: {};

  constructor(private profileService: ProfileService, private authService: AuthService) {
    this.checkToken();
  }

  ngOnInit() {
    this.getProfileData();
  }

  checkToken() {
    this.checkUserLogged = this.authService.checkToken;
  }


  getProfileData() {
    this.loader = true;
    this.profileService.GetProfileInformations().subscribe({
      next: (data: ProfileResponse) => {
        if (data.message === 'Auth success') {
          this.profileData = data.me;
        }
        this.loader = false;
      },
      error: (err) => {
        this.loader = false;
      }
    });
  }




}
