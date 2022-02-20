import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile } from 'firebase/auth';
import { NavController, ToastController } from '@ionic/angular';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  loading = false;
  constructor(
    private auth: AngularFireAuth,
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
    this.auth.createUserWithEmailAndPassword(this.email.value, this.password.value).then(async (u) => {
      await updateProfile(u.user, {
        displayName: this.name.value
      });
      this.balanceService.create(u.user.uid); // Create balance
      this.navCtrl.navigateRoot(['tabs/home'], { replaceUrl: true });
      this.loading = false;
    }).catch(e => {
      this.loading = false;
      const message = e.message.replace('Firebase: ', '');
      this.showError(message);
    });
  }

  validate() {
    this.name.markAsDirty();
    this.email.markAsDirty();
    this.password.markAsDirty();
  }

  isValid() {
    return this.name.valid && this.email.valid && this.password.valid;
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
