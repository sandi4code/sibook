import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionTab } from './transaction.tab';
import { TransactionTabRoutingModule } from './transaction-routing.module';
import { TransactionFilterModalModule } from 'src/app/components/modals/transaction-filter/transaction-filter.modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TransactionTabRoutingModule,
    TransactionFilterModalModule
  ],
  declarations: [TransactionTab]
})
export class TransactionTabModule {}
