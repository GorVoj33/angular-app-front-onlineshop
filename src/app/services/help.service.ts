import { Injectable } from '@angular/core';
import { Cart } from '../users/carts/carts.model';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  calculateTotalForCart(cart: Cart) {
    var sum = 0;
    for(var i of cart.items){
      sum = sum + i.total;
    }
    return sum;
  }

  constructor() { }
  jsonToCart(json_obj){
    return new Cart(json_obj['id'],json_obj['total'],json_obj['itemsNumber'],json_obj['items']);
  }
}
