import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

export class Category{
  constructor(id: number, name: string){}

}
export class Product{
  constructor(id:number, name:string, description:string,
    price: number, numberInStock:number,
    isActive:boolean, category:Category){}
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  toggle:boolean = true;
  saved = false;
  error: boolean = false;
  members: Product[];
  errorMessage : String = "";
  dataLoading: boolean = false;
  private querySubscription;
  profileUrl : String;
  counter: number;
  object: Product;
  constructor(private _backendService: BackendService) { }

  ngOnInit() {
    this.getAllData();
  }
  getAllData() {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getProducts('product')
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
    else {this.counter = this.counter - 1;}  
  }
  showDetails(item){
    this.counter = 0;
    this.object = item;
    this.getPic(item.path);
    this.dataLoading = true;
    
  }
}
