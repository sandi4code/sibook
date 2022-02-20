import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SavingTab } from './saving.tab';
import { SavingTabRoutingModule } from './saving-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SavingTabRoutingModule
  ],
  declarations: [SavingTab]
})
export class SavingTabModule {}
