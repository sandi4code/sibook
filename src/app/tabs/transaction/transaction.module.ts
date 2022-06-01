import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { TransactionTab } from './transaction.tab';
import { TransactionTabRoutingModule } from './transaction-routing.module';
import { TransactionFilterModalModule } from 'src/app/shared/components/modals/transaction-filter/transaction-filter.modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PipeModule,
    TransactionTabRoutingModule,
    TransactionFilterModalModule
  ],
  declarations: [TransactionTab]
})
export class TransactionTabModule {}
