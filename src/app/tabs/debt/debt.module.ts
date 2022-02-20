import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DebtTab } from './debt.tab';
import { DebtTabRoutingModule } from './debt-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DebtTabRoutingModule
  ],
  declarations: [DebtTab]
})
export class DebtTabModule {}
