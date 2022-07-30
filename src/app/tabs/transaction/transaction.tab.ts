import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActionSheetController, InfiniteScrollCustomEvent, ModalController, NavController, RefresherCustomEvent } from '@ionic/angular';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { TransactionFilterModal } from 'src/app/shared/components/modals/transaction-filter/transaction-filter.modal';
import * as moment from 'moment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, scan, switchMap, tap } from 'rxjs/operators';
import { TransactionFilter, TransactionRequest } from 'src/app/shared/interfaces/transaction';

@Component({
  selector: 'app-transaction-tab',
  templateUrl: 'transaction.tab.html',
  styleUrls: ['transaction.tab.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionTab implements OnInit {
  user: any;
  items = [];
  categoryList = [];
  summary: any;
  filter: TransactionFilter = {
    month: moment().format('YYYY-MM'),
    orderBy: 'date',
    orderDir: 'desc',
    type: 'all'
  }
  page = 1;
  limit = 10;
  isScrollEnd = false;

  #infiniteEvent: InfiniteScrollCustomEvent;
  #refresherEvent: RefresherCustomEvent;

  transactionSubject$ = new BehaviorSubject({ page: this.page, limit: this.limit });
  transaction$ = new Observable<any[]>();

  constructor(
    private transactionService: TransactionService,
    private navController: NavController,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) {}

  async ngOnInit() {
    this.init();
  }

  ionViewWillEnter() {
    this.getSummary();
  }

  init() {
    this.transactionSubject$ = new BehaviorSubject({ page: this.page, limit: this.limit });
    this.transaction$ = this.transactionSubject$.pipe(
      switchMap(({ page, limit }) => this.getTransaction(page, limit)),
      scan((acc: any[], items: any[]) => [...acc, ...items]),
      tap(() => {
        if (this.#refresherEvent) {
          this.#refresherEvent.target.complete();
          this.#refresherEvent = null;
        }
        if (this.#infiniteEvent) {
          this.#infiniteEvent.target.complete();
          this.#infiniteEvent = null;
        }
      })
    );
  }

  doRefresh(event = null) {
    this.page = 1;
    this.isScrollEnd = false;
    this.#refresherEvent = event;
    this.transactionSubject$.complete();
    this.init();
  }

  loadMore(event) {
    this.page += 1;
    this.#infiniteEvent = event;
    this.transactionSubject$.next({ page: this.page, limit: this.limit });
  }

  getTransaction(page: number, limit: number) {
    let params: TransactionRequest = {
      month: this.filter.month,
      orderBy: this.filter.orderBy,
      orderDir: this.filter.orderDir,
      type: this.filter.type,
      page: page,
      limit: limit
    };
    return this.transactionService.getTransaction(params).pipe(
      tap((result) => {
        console.log(result)
        if (result.length == 0) {
          this.isScrollEnd = true;
        }
      }),
      catchError(() => {
        return of([]);
      })
    );
  }

  async getSummary() {
    this.transactionService.getSummary('', '').subscribe(res => {
      this.summary = res;
    });
  }

  categoryLabel(name: string) {
    return this.categoryList.find(c => c.name == name)?.label;
  }

  async presentFilter() {
    const modal = await this.modalController.create({
      component: TransactionFilterModal,
      componentProps: {
        filter: this.filter
      },
      mode: 'ios',
      swipeToClose: true,
      keyboardClose: true,
      handle: true,
      backdropBreakpoint: 10,
      breakpoints: [50, 100],
      initialBreakpoint: 50
    });

    await modal.present();
    modal.onWillDismiss().then(e => {
      if (e.data?.filter) {
        this.filter = e.data.filter;
        this.doRefresh(null);
      }
    });
  }

  onEdit(item: any) {
    this.navController.navigateForward(['transaction/' + item.type, item]);
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
