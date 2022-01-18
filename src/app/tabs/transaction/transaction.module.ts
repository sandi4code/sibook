import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionTab } from './transaction.tab';
import { TransactionTabRoutingModule } from './transaction-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TransactionTabRoutingModule
  ],
  declarations: [TransactionTab]
})
export class TransactionTabModule {}
