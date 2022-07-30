import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AuthService]
})
export class LoginPage implements OnInit {
  phone = new FormControl('', [Validators.required, Validators.minLength(9)]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  loading = false;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.validate();
    if (!this.isValid()) {
      return;
    }
    this.loading = true;
    const data = {
      phone: this.phone.value,
      password: this.password.value
    };
    this.authService.login(data).then(async (res) => {
      this.userService.setToken(res.token);
      this.userService.setUserInfo(res);
      this.navCtrl.navigateRoot(['tabs/home'], { replaceUrl: true });
      this.loading = false;
    }).catch(e => {
      this.loading = false;
      this.showError(e.error ? e.error.message : e.message);
    });
  }

  validate() {
    this.phone.markAsDirty();
    this.password.markAsDirty();
  }

  isValid() {
    return this.phone.valid && this.password.valid;
  }

  async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      color: 'danger',
      duration: 3000
    });
    await toast.present();
  }
}
