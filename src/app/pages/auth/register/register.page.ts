import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { updateProfile } from 'firebase/auth';
import { NavController, ToastController } from '@ionic/angular';
import { BalanceService } from 'src/app/shared/services/balance.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required, Validators.minLength(9)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  loading = false;
  constructor(
    private authService: AuthService,
    private balanceService: BalanceService,
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
      name: this.name.value,
      phone: this.phone.value,
      email: this.email.value,
      password: this.password.value
    }
    this.authService.register(data).then(async (u) => {
      this.presentToast('Pendaftaran berhasil, silahkan login untuk melanjutkan.', 'success');
      this.navCtrl.navigateRoot(['auth/login'], { replaceUrl: true });
      this.loading = false;
    }).catch(e => {
      this.loading = false;
      this.presentToast(e.message, 'danger');
    });
  }

  validate() {
    this.name.markAsDirty();
    this.email.markAsDirty();
    this.password.markAsDirty();
  }

  isValid() {
    return this.name.valid && this.phone.valid && this.email.valid && this.password.valid;
  }

  async presentToast(message: string, color: string = 'default') {
    const toast = await this.toastCtrl.create({
      message,
      color: color,
      duration: 3000
    });
    await toast.present();
  }
}
