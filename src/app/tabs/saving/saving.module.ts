import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { SavingTab } from './saving.tab';
import { SavingTabRoutingModule } from './saving-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PipeModule,
    SavingTabRoutingModule
  ],
  declarations: [SavingTab]
})
export class SavingTabModule {}
