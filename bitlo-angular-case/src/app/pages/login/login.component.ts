import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authResponse } from 'src/app/shared/models/authResponse.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  errorMessage: string;
  hide: boolean = true;
  loading: boolean = false;
  userErrorMessage: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.checkUserLogged();
  }


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  checkUserLogged() {
    if (this.authService.checkToken == true) {
      this.authService.Router(['/profil']);
    }
  }

  userLogin() {
    this.loading = true;
    let identifier = this.form.get('email')?.value;
    let password = this.form.get('password')?.value;

    this.authService.Login(identifier, password).subscribe({
      next: (data: authResponse) => {
        if (data.message === 'Login success') {
          this.userErrorMessage = false;
          if (data.token != undefined) {
            this.authService.SetStorageUser(data.token);
          }
          this.authService.Router(['/profil']);
        }
      },
      error: (err) => {
        this.userErrorMessage = true;
        this.errorMessage = 'Kullanıcı adı ya da parola yanlış';
      },
      complete: () => {
        this.loading = false;
      }
    });

  }


  getErrorMessage() {
    if (this.form.get('email')?.hasError('required')) {
      return 'Lütfen gerekli alanları doldurunuz';
    } if (this.form.get('email')?.hasError('email')) {
      return 'Lütfen geçerli bir e-posta adresi giriniz';
    }
    return this.form.get('email')?.hasError('email') ? 'Lütfen geçerli bir e-posta adresi giriniz' : '';
  }



}
