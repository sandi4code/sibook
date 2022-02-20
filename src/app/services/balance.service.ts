import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private path = '/balances/';

  constructor(
    private db: AngularFirestore
  ) {
  }

  get(uid: string) {
    return this.db.doc(this.path + uid);
  }

  create(uid: string): any {
    return this.db.doc(this.path + uid).set({value: 0});
  }

  update(uid: string, balance: number): Promise<void> {
    return this.db.doc(this.path + uid).set({value: balance});
  }
}
