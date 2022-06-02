import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends ApiService {
  async getSummary(month: string) {
    return this.get('transaction/summary', { month });
  }
}
