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
    if (Object.keys(this.authService.tokenValue).length !== 0) {
      this.checkUserLogged = true;
    } else {
      this.checkUserLogged = false;
    }
  }

  ngOnInit() {

    this.getProfileData();
  }

  getProfileData() {
    this.loader = true;
    this.profileService.GetProfileInformations().subscribe((data: ProfileResponse) => {
      this.profileData = data.me;
      console.log(this.profileData)
      this.loader = false;
    },
      err => {
        console.log(err);
        this.loader = false;
      })
  }


}
