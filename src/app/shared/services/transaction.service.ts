import { Injectable } from '@angular/core';
import { TransactionRequest } from '../interfaces/transaction';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends ApiService {
  getTransaction(params: TransactionRequest) {
    return this.get('transaction', params);
  }

  getSummary(month: any, year: any) {
    return this.get('transaction/summary', { month, year });
  }

  create(data) {
    return this.post('transaction', data);
  }

  update(data) {
    return this.put('transaction', data);
  }

  del(id) {
    return this.delete('transaction', id);
  }
}
