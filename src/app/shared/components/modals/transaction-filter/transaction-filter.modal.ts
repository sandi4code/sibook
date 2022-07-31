import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionFilter } from 'src/app/shared/interfaces/transaction';
import { FilterType, FilterSort, FilterMonth } from 'src/app/shared/interfaces/filter';

@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.modal.html',
  styleUrls: ['./transaction-filter.modal.scss']
})
export class TransactionFilterModal implements OnInit {
  @Input('filter') filter: TransactionFilter;
  month: string = '01';
  months: FilterMonth[] = [
    { value: '01', title: 'Januari' },
    { value: '02', title: 'Februari' },
    { value: '03', title: 'Maret' },
    { value: '04', title: 'April' },
    { value: '05', title: 'Mei' },
    { value: '06', title: 'Juni' },
    { value: '07', title: 'Juli' },
    { value: '08', title: 'Agustus' },
    { value: '09', title: 'September' },
    { value: '10', title: 'Oktober' },
    { value: '11', title: 'Nopember' },
    { value: '12', title: 'Desember' }
  ];
  year: string = '2022';
  years: string[] = ['2021', '2022'];
  type: string = 'all';
  types: FilterType[] = [
    { title: 'Semua', value: 'all' },
    { title: 'Pemasukan', value: 'income' },
    { title: 'Pengeluaran', value: 'expense' }
  ];
  sort: string = 'newest';
  sorts: FilterSort[] = [
    { title: 'Terbaru', value: 'newest' },
    { title: 'Terlama', value: 'oldest' },
    { title: 'Termahal', value: 'highest' },
    { title: 'Termurah', value: 'lowest' }
  ];
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.month = this.filter.month;
    this.year = this.filter.year;
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
    this.filter.month = this.month;
    this.filter.year = this.year;
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
