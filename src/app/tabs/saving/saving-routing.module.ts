import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavingTab } from './saving.tab';

const routes: Routes = [
  {
    path: '',
    component: SavingTab,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavingTabRoutingModule {}
