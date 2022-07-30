import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { TransactionInputPageRoutingModule } from './input-routing.module';

import { TransactionInputPage } from './input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrencyMaskModule,
    TransactionInputPageRoutingModule
  ],
  declarations: [TransactionInputPage]
})
export class TransactionInputPageModule {}
