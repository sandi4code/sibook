import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { SavingTab } from './saving.tab';
import { SavingTabRoutingModule } from './saving-routing.module';
import { SavingFilterModalModule } from 'src/app/shared/components/modals/saving-filter/saving-filter.modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PipeModule,
    SavingTabRoutingModule,
    SavingFilterModalModule
  ],
  declarations: [SavingTab]
})
export class SavingTabModule {}
