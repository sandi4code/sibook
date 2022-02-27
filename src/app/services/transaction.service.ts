import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BalanceService } from './balance.service';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private pathItems = '/transactions/';
  private pathSummary = '/transactions/';
  private user: any;
  private currentBalance: any;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private balanceService: BalanceService
  ) {
    this.auth.currentUser.then((user) => {
      this.user = user;
      this.pathItems = '/transactions/' + user.uid + '/items';
      this.pathSummary = '/transactions/' + user.uid + '/summary';
      this.balanceService.get(user.uid).valueChanges().subscribe(res => this.currentBalance = res);
    });
  }

  get(filter: any) {
    return this.db.collection(this.pathItems, ref =>
      ref.where('type', (filter.type == 'all') ? 'in' : '==', (filter.type == 'all') ? ['income', 'expense'] : filter.type)
        .where('month', '==', filter.month)
        .orderBy(filter.orderBy, filter.orderDir)
    );
  }

  getLatest() {
    return this.db.collection(this.pathItems, ref => ref.orderBy('date', 'desc').limit(10));
  }

  async create(params: any) {
    await this.db.collection(this.pathItems).add(params);
    await this.updateSummary(params.month, params);
    if (this.currentBalance) {
      let newBalance = 0;
      if (params.type == 'income') {
        newBalance = Number(this.currentBalance?.value) + Number(params.amount);
      } else if (params.type == 'expense') {
        newBalance = Number(this.currentBalance?.value) - Number(params.amount);
      }
      await this.balanceService.update(this.user.uid, newBalance);
    }
  }

  async update(id: string, params: any, amountOld: number) {
    await this.db.collection(this.pathItems).doc(id).set(params);
    if (this.currentBalance) {
      let newBalance = 0;
      let amountChange = Number(params.amount);
      if (params.amount != amountOld) {
        amountChange = Number(params.amount) - Number(amountOld);
      }
      if (params.type == 'income') {
        newBalance = Number(this.currentBalance?.value) + amountChange;
      } else if (params.type == 'expense') {
        newBalance = Number(this.currentBalance?.value) - amountChange;
      }
      await this.updateSummary(params.month, params, 'update', amountChange);
      await this.balanceService.update(this.user.uid, newBalance);
    }
  }

  async delete(item: any) {
    await this.db.collection(this.pathItems).doc(item.id).delete();
    await this.updateSummary(item.month, item, 'delete');
    if (this.currentBalance) {
      let newBalance = 0;
      if (item.type == 'income') {
        newBalance = Number(this.currentBalance?.value) - Number(item.amount);
      } else {
        newBalance = Number(this.currentBalance?.value) + Number(item.amount);
      }
      await this.balanceService.update(this.user.uid, newBalance);
    }
  }

  getSummary(month: string) {
    return this.db.collection(this.pathSummary).doc(month);
  }

  getSummaryList() {
    return this.db.collection(this.pathSummary);
  }

  async updateSummary(month: string, item: any, method: string = 'update', amountChange: number = 0) {
    let docRef = this.getSummary(month);
    let summary = {
      income: (await docRef.get().toPromise()).get('income') | 0,
      expense: (await docRef.get().toPromise()).get('expense') | 0
    }
    if (item.type == 'income') {
      if (method == 'update') {
        if (amountChange == 0) {
          amountChange = Number(item.amount);
        }
        summary.income = Number(summary.income) + amountChange;
      } else {
        summary.income = Number(summary.income) - Number(item.amount);
      }
    } else if (item.type == 'expense') {
      if (method == 'update') {
        if (amountChange == 0) {
          amountChange = Number(item.amount);
        }
        summary.expense = Number(summary.expense) + amountChange;
      } else {
        summary.expense = Number(summary.expense) - Number(item.amount);
      }
    }
    await docRef.set(summary);
  }
}
