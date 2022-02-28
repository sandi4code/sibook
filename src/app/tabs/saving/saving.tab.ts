import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CategoryService } from 'src/app/services/category.service';
import { SavingService } from 'src/app/services/saving.service';
import { SavingFilterModal } from 'src/app/components/modals/saving-filter/saving-filter.modal';
import * as moment from 'moment';

@Component({
  selector: 'app-saving-tab',
  templateUrl: 'saving.tab.html',
  styleUrls: ['saving.tab.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SavingTab implements OnInit {
  user: any;
  items = [];
  categoryList = [];
  summaryList = [];
  filter = {
    month: moment().format('YYYY-MM'),
    orderBy: 'date',
    orderDir: 'desc',
    type: 'all'
  }
  constructor(
    private auth: AngularFireAuth,
    private categoryService: CategoryService,
    private savingService: SavingService,
    private navController: NavController,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) { }

  async ngOnInit() {
    this.user = await this.auth.currentUser;
    this.fetchCategory();
    this.fetchSummary();
    this.fetchData();
  }

  fetchData() {
    this.savingService
      .get(this.filter)
      .valueChanges({ idField: 'id' })
      .subscribe((res) => {
        this.items = res;
      });
  }

  fetchCategory() {
    this.categoryService
      .get()
      .valueChanges({ idField: 'id' })
      .subscribe((res) => {
        this.categoryList = res;
      });
  }

  fetchSummary() {
    this.savingService
      .getSummaryList()
      .valueChanges({ idField: 'month' })
      .subscribe((res) => {
        this.summaryList = res;
      });
  }

  summaryIncome() {
    return this.summaryList.find(s => s.month == this.filter.month)?.income | 0;
  }

  summaryExpense() {
    return this.summaryList.find(s => s.month == this.filter.month)?.expense | 0;
  }

  categoryLabel(name: string) {
    return this.categoryList.find(c => c.name == name)?.label;
  }

  async presentFilter() {
    const modal = await this.modalController.create({
      component: SavingFilterModal,
      componentProps: {
        filter: this.filter
      },
      cssClass: 'modal-filter',
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1],
      swipeToClose: true,
      keyboardClose: true
    });

    await modal.present();
    modal.onWillDismiss().then(e => {
      if (e.data?.filter) {
        this.filter = e.data.filter;
        this.fetchData();
      }
    });
  }

  onEdit(item: any) {
    this.navController.navigateForward(['saving/' + item.type, item]);
  }

  onDelete(item: any) {
    this.savingService.delete(item);
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
