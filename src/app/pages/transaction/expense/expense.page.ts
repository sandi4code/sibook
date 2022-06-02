import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/shared/services/category.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import * as moment from 'moment';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit, OnDestroy {
  id = '';
  amount = 0;
  amountOld = 0;
  amountFocus = false;
  date = '';
  description = '';
  category = '';
  categoryList = [];
  currentBalance: any;
  isValidated = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) {
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
    this.categoryService.get().valueChanges().subscribe(res => this.categoryList = res);
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

    let params = {
      amount: this.amount,
      date: this.date,
      month: this.date.substring(0, 7),
      category_id: this.category,
      category_name: this.categoryList.find(c => c.name == this.category)?.label,
      description: this.description,
      type: 'expense'
    }

    if (this.id == '') {
      Object.assign(params, { created_at: moment().toISOString() });
    } else {
    }

    this.navCtrl.back();
  }

  onAmountFocus() {
    this.amountFocus = true;
  }
}
