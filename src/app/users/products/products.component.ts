import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { CartItem, Cart } from '../carts/carts.model';
import { AUTHENTICATED_USER, ITEMS_NUMBER, AuthenticationService } from 'src/app/services/authentication.service';
import { HelpService } from 'src/app/services/help.service';
import { OrderItem } from '../orders/finalOrder.model';
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from 'src/app/services/cart.service';
export class Category{
  id:number;
  name: string;
  constructor(id: number, name: string){
    this.id = id;
    this.name = name;
  }
  
}
export class Product{
  constructor(id:number, name:string, description:string,
    price: number, unitsInStock:number,
    active:boolean, category:Category){}
    get name(): String {
      return this.name;
    }
    get category(): Category{
      return this.category;
    }
    get description(): String {
      return this.description;
    }
    get price(): number{
      return this.price;
    }
    get unitsInStock():number{
      return this.unitsInStock;
    }
    get active():boolean{
      return this.active;
    }

}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  toggle:boolean = true;
  noProductFounded = false;
  saved = false;
  error: boolean = false;
  members: Product[];
  errorMessage : String = "";
  dataLoading: boolean = false;
  private querySubscription;
  profileUrl : String;
  counter: number = 1;
  object: Product;
  cart : Cart ;
  userLoggedIn:boolean = false;
  selectedCategoryFromFooterID:number;
  constructor(private _backendService: BackendService, 
    private helpService : HelpService, 
    private _authService:AuthenticationService,
    private route : ActivatedRoute,
    private router: Router,
    private _cartService: CartService) { }
  totalInStockForSelectedProduct: number = 0;

  items : CartItem[];
  ngOnInit() {
    this.selectedCategoryFromFooterID = this.route.snapshot.paramMap.get('id') ? parseInt(this.route.snapshot.paramMap.get('id')) : null;
    if(this.selectedCategoryFromFooterID===null){
      this.getAllActiveProducts();
    }else{
      this.getProductsByCategory();
    }
    this.loadCartForUser();
  }
  getProductsByCategory(){
    this.dataLoading = true;
    this.querySubscription = this._backendService.getProductsByCategoryId(this.selectedCategoryFromFooterID)
    .subscribe(
      members => {
        this.members = members;
        this.dataLoading = false;
      },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.error = false;
        this.dataLoading = false;
      }
    );
  }
  loadCartForUser() {
    if(this._authService.isUserLoggedIn()){
      this.userLoggedIn = true;
      this.querySubscription = this._backendService.getCart(sessionStorage.getItem(AUTHENTICATED_USER)).subscribe(
        data => {
          this.cart = this.helpService.jsonToCart(data);
          console.log('sifra karte: ',this.cart.id);
          this.dataLoading = false;
        }
      )
    }else {
      if(sessionStorage.getItem('cart_items')===null){
        this.items = [];
        
      }else {
        this.items = JSON.parse(sessionStorage.getItem('cart_items'));
      }
      //this. cart = new Cart(30,0,0,null);
    }
  }
  getAllActiveProducts() {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getOnlyActiveProducts()
    .subscribe(
      members => {
        console.log('OUTPUT: '+members)
        this.members = members;
        this.dataLoading = false;
      },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.error = false;
        this.dataLoading = false;
      }
    );
  }
  getPic(id){
    this.profileUrl = "";
  }
  count(type){
    if(type === 'add'){this.counter = this.counter + 1;}
    else {
      if(this.counter > 1)
        this.counter = this.counter - 1;}  
  }
  showDetails(item){
    this.totalInStockForSelectedProduct = item.unitsInStock;
    this.counter = 0;
    this.object = item;
    this.getPic(item.path);  
  }
  findMaxId(){
    var max = 0;
    for (var i of this.cart.items){
      
      if(i.itemId > max)
      max = i.itemId;
    }
    return max;
  }
  addToCart(product:Product, counter:number){
      // in case that procuts exists in cart, we should update quantity (no need to make new item),
      // in other case we have to make cart item first, then to set quantity etc
      if(this._authService.isUserLoggedIn()){
          var isExist= this.checkProductIsOrdered(product);
          if(isExist){
            console.log('Postoji taj artikal u items');
            for(let p of this.cart.items){
              if(p.product.name === product.name){
                p.countProducts = p.countProducts+counter;
                console.log('Total pre: ', p.total);
                p.total = p.total + p.product.price*counter;
                console.log('dodato jos: ',counter, '  sada ima: ',p.countProducts);
                console.log('Total posle: ', p.total);
                var total = this.helpService.calculateTotalForCart(this.cart);
                console.log('Total cart pre: ',this.cart.total);
                this.cart.total = total;
                this.refreshCart();
                console.log('Total cart posle: ',this.cart.total);
              }
            }
          }
          else {
            let maxId = this.findMaxId();
            console.log('sledeci slobodan id: ', (maxId+1))
            let id = this.cart.items.length===0 ? 1 : maxId+1;
            let totalForItem = counter*product.price;         
            let ci = new CartItem(id,counter, product, totalForItem);           
            var total = this.cart.total+totalForItem;
            this.cart.setTotal(total);             
            this.cart.items.push(ci);
            this.cart.setNumber(this.cart.items.length);
            this.refreshCart();
            let num = this._cartService.getItemsNumber()+1
            this._cartService.updateItemsNumber(this._cartService.getItemsNumber() + 1);
          }
        }
        else{
          //var items = new Array();
          //this.items = JSON.parse(sessionStorage.getItem('cart_items'));
          
          isExist = this.checkProductInArray(this.items, product);
          if(isExist){
            this.updateQuantity(product, counter);
          }else{
            var oi = new CartItem(this.items.length+1, counter,product,counter*product.price);
            this.items.push(oi);
            this._cartService.updateItemsNumber(this._cartService.getItemsNumber() + 1);
          }
          var json_items = JSON.stringify(this.items);
          sessionStorage.setItem('cart_items',json_items);
          console.log('Item ',oi.product.name, ' je dodat u session')
        }
  }
  updateQuantity(product, counter){
    for (let i of this.items){
      if(i.product.name === product.name){
        i.countProducts = i.countProducts + counter;
        i.total = i.total + counter*product.price;
      }
    }
  }
  checkProductInArray(orderItems: CartItem[], product){
    if(orderItems.length > 0) {
      for (let i of orderItems){
        if (i.product.name === product.name){
          return true;
        }
        
      }
    }
    console.log('Ovo je novi item')
    return false;

  }
  checkProductIsOrdered(product):boolean {
    console.log('Provera za ', product.name);
    if(this.cart.items.length>0){
      console.log('Duzina niza itemsa: ',this.cart.items.length)
      for(let p of this.cart.items){
        var pom: Product= p.product;
        console.log('postoji element u itemsima');
        if(pom.name===product.name){
          console.log('Imena artikala ',p.product.name,',',product.name);
          return true;
        }
        
      }
    }
    else {
      console.log('Duzina niza je 0');
      
    }
    return false;
  }

  refreshCart(){
    this.querySubscription = this._backendService.updateCart(this.cart).subscribe(      
      data => {
        this.cart = this.helpService.jsonToCart(data);
        let number = ''+data['itemsNumber'];
        console.log('Novi broj items: ',number);
        sessionStorage.setItem(ITEMS_NUMBER,number);
      }
    );
  }

  getProductsByFilter(searchValue){
    this.dataLoading = true;
    if(searchValue==='') {
      // in this case we should display all products because there is no filter value.
      this.querySubscription = this._backendService.getProducts().subscribe(
        data => {
          this.members = data;
          this.dataLoading = false;
          return;
        }
      )
    } 
    this.querySubscription = this._backendService.getProductsByFilter(searchValue).subscribe(
      data => {
        this.members = data;
        this.dataLoading = false;
        if(this.members.length ===0) {
          this.noProductFounded = true;
        }
      }
    );
  }
  onSelect(category_id){
    this.router.navigate(['/products/category',category_id]);
  }
}
