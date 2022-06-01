import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  loading = false;
  constructor(
    private auth: AngularFireAuth,
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
    this.auth.signInWithEmailAndPassword(this.email.value, this.password.value).then(async (u) => {
      this.navCtrl.navigateRoot(['tabs/home'], { replaceUrl: true });
      this.loading = false;
    }).catch(e => {
      this.loading = false;
      const message = e.message.replace('Firebase: ', '');
      this.showError(message);
    });
  }

  validate() {
    this.email.markAsDirty();
    this.password.markAsDirty();
  }

  isValid() {
    return this.email.valid && this.password.valid;
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
