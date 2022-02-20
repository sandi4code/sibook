import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.modal.html',
  styleUrls: ['./transaction-filter.modal.scss']
})
export class TransactionFilterModal implements OnInit {
  type: string = null;
  types = [
    {title: 'Semua', value: null},
    {title: 'Pemasukan', value: 'income'},
    {title: 'Pengeluaran', value: 'expense'}
  ];
  sort: string = 'newest';
  sorts = [
    {title: 'Terbaru', value: 'newest'},
    {title: 'Terlama', value: 'oldest'},
    {title: 'Termahal', value: 'highest'},
    {title: 'Termurah', value: 'lowest'}
  ];
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  onSelectType(type: string = null) {
    this.type = type;
  }

  onSelectSort(sort: string) {
    this.sort = sort;
  }

  onSubmit() {
    this.modalController.dismiss();
  }
}
