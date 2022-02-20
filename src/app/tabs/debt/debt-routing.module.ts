import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtTab } from './debt.tab';

const routes: Routes = [
  {
    path: '',
    component: DebtTab,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebtTabRoutingModule {}
