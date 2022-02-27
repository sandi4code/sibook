import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { ExpensePageRoutingModule } from './expense-routing.module';

import { ExpensePage } from './expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrencyMaskModule,
    ExpensePageRoutingModule
  ],
  declarations: [ExpensePage]
})
export class ExpensePageModule {}
