import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { BalanceService } from "../../shared/services/balance.service";
import { TransactionService } from 'src/app/shared/services/transaction.service';
import * as moment from 'moment';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home-tab',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
  user: any;
  balance: number = 0;
  summary: any;
  transactions = [];
  categoryList = [];
  loading = {
    balance: false,
    summary: false,
    transaction: false,
  }

  constructor(
    private userService: UserService,
    private balanceService: BalanceService,
    private transactionService: TransactionService,
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController
  ) {
  }

  async ngOnInit() {
    this.user = this.userService.getUserInfo();
    this.fetchSummary();
    this.fetchTransaction();
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

  fetchBalance() {
    this.loading.balance = true;
    this.balanceService.getCurrentBalance().toPromise().then(res => {
      this.balance = res.balance;
      this.loading.balance = false;
    });
  }

  async fetchSummary() {
    let month = moment().format('YYYY-MM');
  }

  fetchTransaction() {
  }

  categoryLabel(name: string) {
    return this.categoryList.find(c => c.name == name)?.label;
  }

  onEdit(item: any) {
    this.navCtrl.navigateForward(['transaction/'+item.type, item]);
  }

  onDelete(item: any) {
  }

  async openAction(item: any) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'acsheet',
      header: 'Pilih',
      buttons: [{
        text: 'Hapus',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.onDelete(item);
        }
      }, {
        text: 'Edit',
        icon: 'pencil',
        handler: () => {
          this.onEdit(item);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });

    await actionSheet.present();
  }
}
