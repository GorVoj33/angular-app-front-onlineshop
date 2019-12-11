import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 private itemsNumber = new BehaviorSubject<number>(0);
 public share = this.itemsNumber.asObservable(); 
  constructor() { }
  updateItemsNumber(newNumber){
    this.itemsNumber.next(newNumber);
  }
  getItemsNumber(){
    return this.itemsNumber.value;
  }
}
