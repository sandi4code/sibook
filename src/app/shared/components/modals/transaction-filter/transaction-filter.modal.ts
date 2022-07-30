import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionFilter } from 'src/app/shared/interfaces/transaction';

interface FilterSort {
  title: string
  value: string
}

interface FilterType {
  title: string
  value: string
}
@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.modal.html',
  styleUrls: ['./transaction-filter.modal.scss']
})
export class TransactionFilterModal implements OnInit {
  @Input('filter') filter: TransactionFilter;
  type: string = 'all';
  types: FilterType[] = [
    {title: 'Semua', value: 'all'},
    {title: 'Pemasukan', value: 'income'},
    {title: 'Pengeluaran', value: 'expense'}
  ];
  sort: string = 'newest';
  sorts: FilterSort[] = [
    {title: 'Terbaru', value: 'newest'},
    {title: 'Terlama', value: 'oldest'},
    {title: 'Termahal', value: 'highest'},
    {title: 'Termurah', value: 'lowest'}
  ];
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.type = this.filter.type;
    if (this.filter.orderBy == 'date') {
      if (this.filter.orderDir == 'desc') {
        this.sort = 'newest';
      } else {
        this.sort = 'oldest';
      }
    } else if (this.filter.orderBy == 'amount') {
      if (this.filter.orderDir == 'desc') {
        this.sort = 'highest';
      } else {
        this.sort = 'lowest';
      }
    }
  }

  onSelectType(type: string = null) {
    this.type = type;
  }

  onSelectSort(sort: string) {
    this.sort = sort;
  }

  onSubmit() {
    this.filter.type = this.type;
    if (this.sort == 'newest') {
      this.filter.orderBy = 'date';
      this.filter.orderDir = 'desc';
    } else if (this.sort == 'oldest') {
      this.filter.orderBy = 'date';
      this.filter.orderDir = 'asc';
    } else if (this.sort == 'highest') {
      this.filter.orderBy = 'amount';
      this.filter.orderDir = 'desc';
    } else if (this.sort == 'lowest') {
      this.filter.orderBy = 'amount';
      this.filter.orderDir = 'asc';
    }
    this.modalController.dismiss({
      filter: this.filter
    });
  }
}
