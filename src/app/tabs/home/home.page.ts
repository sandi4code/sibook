import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BalanceService } from "../../services/balance.service";
import firebase from 'firebase/compat';

@Component({
  selector: 'app-home-tab',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
  user: firebase.User;
  balance: any;

  constructor(
    private auth: AngularFireAuth,
    private balanceService: BalanceService
  ) {
  }

  async ngOnInit() {
    this.user = await this.auth.currentUser;
    this.balanceService.get(this.user.uid).valueChanges().subscribe(
      r => this.balance = r
    );
  }

  greeting() {
    const hours = new Date().getHours();
    let message = 'Selamat ';
    if (hours < 11) {
      message += 'pagi';
    } else if (hours >= 11 && hours <= 14) {
      message += 'siang';
    } else if (hours >= 15 && hours <= 18) {
      message += 'sore';
    } else if (hours > 18) {
      message += 'malam';
    }
    return message;
  }
}
