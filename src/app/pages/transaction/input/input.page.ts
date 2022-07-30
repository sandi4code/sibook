import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/shared/services/category.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import * as moment from 'moment';

@Component({
  selector: 'app-transaction-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
})
export class TransactionInputPage implements OnInit, OnDestroy {
  id: string = '';
  amount: number = 0;
  amountOld: number = 0;
  amountFocus: boolean = false;
  date: string = '';
  description: string = '';
  category: string = '';
  categoryList: any[] = [];
  currentBalance: any;
  isValidated: boolean = false;
  type: string;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) {
    this.type = this.route.snapshot.queryParamMap.get('type');
    console.log(this.type)

    if (this.route.snapshot.paramMap.has('id')) {
      let data = this.route.snapshot.params;
      this.id = data.id;
      this.amount = data.amount;
      this.amountOld = data.amount;
      this.date = moment(data.date).format('YYYY-MM-DD');
      this.description = data.description;
      this.category = data.category_id;
    }
  }

  ngOnInit() {
    Keyboard.addListener('keyboardWillHide', () => {
      if (this.amountFocus) {
        this.amountFocus = false;
      }
    });
    this.categoryList = this.categoryService.getLocalCategories();
  }

  ngOnDestroy(): void {
    Keyboard.removeAllListeners();
  }

  validate() {
    this.isValidated = true;
    return this.amount > 0 && this.date != '' && this.category != '' && this.description != '';
  }

  async onSubmit() {
    if (!this.validate()) {
      return;
    }

    let data = {
      amount: this.amount,
      date: this.date,
      category_id: this.category,
      description: this.description,
      type: 'income'
    }

    if (this.id == '') {
      await this.transactionService.create(data).toPromise();
    } else {
      Object.assign(data, { id: this.id });
      await this.transactionService.update(data).toPromise();
    }

    this.navCtrl.back();
  }

  onAmountFocus() {
    this.amountFocus = true;
  }
}
