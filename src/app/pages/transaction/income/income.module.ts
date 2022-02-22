import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { IncomePageRoutingModule } from './income-routing.module';

import { IncomePage } from './income.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrencyMaskModule,
    IncomePageRoutingModule
  ],
  declarations: [IncomePage]
})
export class IncomePageModule {}
