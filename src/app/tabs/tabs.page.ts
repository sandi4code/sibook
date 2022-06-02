import { Component, ViewChild } from '@angular/core';
import { IonTabs, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  selected_tab = 'home';

  constructor(
    private navCtrl: NavController
  ) {}

  setCurrentTab() {
    this.selected_tab = this.tabs && this.tabs.getSelected();
  }

  tabIcon(tab = 'home') {
    if (tab == 'home') {
      return (this.selected_tab == tab) ? 'storefront' : 'storefront-outline';
    } else if (tab == 'transaction') {
      return (this.selected_tab == tab) ? 'card' : 'card-outline';
    } else if (tab == 'debt') {
      return (this.selected_tab == tab) ? 'receipt' : 'receipt-outline';
    } else if (tab == 'saving') {
      return (this.selected_tab == tab) ? 'cash' : 'cash-outline';
    }
  }

  toIncomePage() {
    this.navCtrl.navigateForward('transaction/income');
  }

  toExpensePage() {
    this.navCtrl.navigateForward('transaction/expense');
  }
}
