import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionTab } from './transaction.tab';

const routes: Routes = [
  {
    path: '',
    component: TransactionTab,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionTabRoutingModule {}
