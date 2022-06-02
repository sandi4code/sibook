import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavingService {
  constructor(
  ) {
  }

  get(filter: any) {
  }

  getLatest() {
  }

  async create(params: any) {
  }

  async update(id: string, params: any, amountOld: number) {
  }

  async delete(item: any) {
  }

  getSummary(month: string) {
  }

  getSummaryList() {
  }

  async updateSummary(month: string, item: any, method: string = 'update', amountChange: number = 0) {
  }
}
