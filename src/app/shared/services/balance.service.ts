import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceService extends ApiService {
  getCurrentBalance() {
    return this.get('transaction/balance', {});
  }
}
