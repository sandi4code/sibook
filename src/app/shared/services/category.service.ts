import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private path = '/categories/';

  constructor(
    private db: AngularFirestore
  ) {
  }

  get() {
    return this.db.collection(this.path);
  }

  create(params: any): any {
    return this.db.collection(this.path).add(params);
  }

  update(id: string, params: any): Promise<void> {
    return this.db.collection(this.path).doc(id).set(params);
  }

  delete(id: string): Promise<void> {
    return this.db.collection(this.path).doc(id).delete();
  }
}
