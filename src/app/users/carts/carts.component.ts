import { Component, OnInit } from '@angular/core';
import { AuthenticationService, AUTHENTICATED_USER } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { Cart, CartItem } from './carts.model';
import { HelpService } from 'src/app/services/help.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  cart:Cart = new Cart(0,0,0,[]);

  displayedColumns: string[] = ['position', 'product-name', 'price', 'quantity','total-item','id'];
  dataSource = this.cart.items;
  elementDeleted: boolean = false;
  userLoggedIn:boolean = false;
  
  dataLoading = false;
  error: boolean = false;
  errorMessage : string = '';

  constructor(private auth : AuthenticationService, 
    private _backendService : BackendService, 
    private helpService : HelpService,
    private _cartService : CartService) { }

  ngOnInit() {
    //this.prikaziKartuNeulogovanog();
    this.dataLoading = true;
    if(this.auth.isUserLoggedIn()){
      this.userLoggedIn = true;
      var username = sessionStorage.getItem(AUTHENTICATED_USER);
      this._backendService.getCart(username).subscribe(
        data => {
          this.cart = data;
          this.dataLoading = false;
          this.dataSource = this.cart.items;
        },
        error => {
          this.dataLoading = false;
          this.error = true;
          this.errorMessage = error.message;
        }
      )
     // cart = 
    }else {
      this.dataLoading = false;
      if(sessionStorage.getItem('cart_items') === null) return;
      
      var items = JSON.parse(sessionStorage.getItem('cart_items'));
      this.cart.items = items;
      this.cart.itemsNumber = this.cart.items.length;
      this.cart.total = this.helpService.calculateTotalForCart(this.cart);
      this.dataLoading = false;
      this.dataSource = this.cart.items;
      //console.log('niko nije ulogovan: ');
    }
  }
  deleteItem(itemId){
    this._cartService.updateItemsNumber(this._cartService.getItemsNumber() - 1);
    //console.log(this.cart.getItems()[id].product.name);
    //this.cart.getItems().splice(id-1,1); 
    if(this.auth.isUserLoggedIn()){
      this._backendService.deleteItemFromCart(this.cart.id, itemId).subscribe(
        data => {
          this.elementDeleted=true;
          this.cart=data;
          this.dataSource = this.cart.items;
          }
        );
    }else{
      var items = JSON.parse(sessionStorage.getItem('cart_items'));
      let items2 = new Array();
      let totalForSelectedItem = 0;
      for (let i of items){
        if(i.itemId===itemId){
          totalForSelectedItem = i.total;
        }else {
          items2.push(i);
        }
      }
      this.cart.items = items2;
      this.cart.itemsNumber = this.cart.items.length;
      this.cart.total = this.cart.total - totalForSelectedItem;
      this.dataSource = this.cart.items;
    }      
  }

  prikaziKartuNeulogovanog(){
    if(sessionStorage['cart_items']){
      var items = JSON.parse(sessionStorage['cart_items']);
      console.log('Karta neulogovanog: ',items)

    }else {
      console.log('Nema tog elemnta')
    }
    
  }
}
