import { Component, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionFilterModal } from 'src/app/components/modals/transaction-filter/transaction-filter.modal';

@Component({
  selector: 'app-transaction-tab',
  templateUrl: 'transaction.tab.html',
  styleUrls: ['transaction.tab.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionTab {

  constructor(
    private modalController: ModalController
  ) {}

  async presentFilter() {
    const modal = await this.modalController.create({
      component: TransactionFilterModal,
      componentProps: { value: 123 },
      cssClass: 'modal-filter',
      initialBreakpoint: 0.65,
      breakpoints: [0, 0.65, 1],
      swipeToClose: true,
      keyboardClose: true
    });
  
    await modal.present();
  }
}
