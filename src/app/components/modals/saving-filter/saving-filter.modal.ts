import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-saving-filter',
  templateUrl: './saving-filter.modal.html',
  styleUrls: ['./saving-filter.modal.scss']
})
export class SavingFilterModal implements OnInit {
  @Input('filter') filter: any;
  type: string = 'all';
  types = [
    {title: 'Semua', value: 'all'},
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
