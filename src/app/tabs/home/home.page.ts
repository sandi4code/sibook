import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/shared/services/category.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan, switchMap, tap } from 'rxjs/operators'
import { BalanceService } from 'src/app/shared/services/balance.service';
import * as moment from 'moment';

interface RefresherCustomEvent extends CustomEvent {
  target: HTMLIonRefresherElement;
}

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
  categoryList = [];
  loading = {
    balance: false,
    summary: false,
    transaction: false,
  }

  #refresherEvent: RefresherCustomEvent;

  balanceSubject$ = new BehaviorSubject(1);
  balance$ = new Observable<any>();

  transactionSubject$ = new BehaviorSubject(1);
  transaction$ = new Observable<any[]>();

  constructor(
    private userService: UserService,
    private balanceService: BalanceService,
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController
  ) {
  }

  ngOnInit() {
    this.user = this.userService.getUserInfo();
    this.getBalance();
    this.getTransaction();
    this.getCategories();
    this.getSummary();
  }

  ngOnDestroy(): void {
    this.balanceSubject$.complete();
    this.transactionSubject$.complete();
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

  doRefresh(event) {
    this.#refresherEvent = event;
    this.balanceSubject$.complete();
    this.transactionSubject$.complete();
    this.getBalance();
    this.getTransaction();
    this.getSummary();
    this.getCategories();
  }

  getBalance() {
    this.balanceSubject$ = new BehaviorSubject(1);
    this.balance$ = this.balanceSubject$.pipe(
      switchMap(() => this.balanceService.getCurrentBalance()),
      scan((acc: any[], items: any[]) => [...acc, ...items]),
      tap(() => {
        if (this.#refresherEvent) {
          this.#refresherEvent.target.complete();
          this.#refresherEvent = null;
        }
      })
    );
  }

  getTransaction() {
    this.transactionSubject$ = new BehaviorSubject(1);
    this.transaction$ = this.transactionSubject$.pipe(
      switchMap(() => this.transactionService.getTransaction({page: 1, limit: 10})),
      scan((acc: any[], items: any[]) => [...acc, ...items]),
      tap(() => {
        if (this.#refresherEvent) {
          this.#refresherEvent.target.complete();
          this.#refresherEvent = null;
        }
      })
    );
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categoryList = res;
      this.categoryService.setLocalCategories(res);
    });
  }

  async getSummary() {
    let month = moment().format('MM');
    let year = moment().format('YYYY');
    this.transactionService.getSummary(month, year).subscribe(res => {
      this.summary = res;
    });
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
