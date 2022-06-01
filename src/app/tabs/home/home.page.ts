import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BalanceService } from "../../shared/services/balance.service";
import { CategoryService } from 'src/app/shared/services/category.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import firebase from 'firebase/compat';
import * as moment from 'moment';

@Component({
  selector: 'app-home-tab',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
  user: firebase.User;
  balance: any;
  summary: any;
  transactions = [];
  categoryList = [];

  constructor(
    private auth: AngularFireAuth,
    private balanceService: BalanceService,
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController
  ) {
  }

  async ngOnInit() {
    this.user = await this.auth.currentUser;
    this.balanceService.get(this.user.uid).valueChanges().subscribe(
      r => this.balance = r
    );
    this.categoryService.get().valueChanges().subscribe(res => {
      this.categoryList = res;
      console.log(this.categoryList);
    });
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

  async fetchSummary() {
    let month = moment().format('YYYY-MM');
    let docRef = this.transactionService.getSummary(month);
    docRef.valueChanges().subscribe(res => {
      this.summary = res;
    });
  }

  fetchTransaction() {
    this.transactionService.getLatest().valueChanges({ idField: 'id' }).subscribe((res) => {
      this.transactions = res;
      console.log(res);
    });
  }

  categoryLabel(name: string) {
    return this.categoryList.find(c => c.name == name)?.label;
  }

  onEdit(item: any) {
    this.navCtrl.navigateForward(['transaction/'+item.type, item]);
  }

  onDelete(item: any) {
    this.transactionService.delete(item);
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
