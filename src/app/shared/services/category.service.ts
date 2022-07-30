import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {
  getCategories() {
    return this.get('category', {});
  }

  getLocalCategories() {
    const categories = localStorage.getItem('categories');
    return (categories) ? JSON.parse(categories) : [];
  }

  setLocalCategories(categories: any[]) {
    localStorage.setItem('categories', JSON.stringify(categories));
  }
}
