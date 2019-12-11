import { Component, OnInit,OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { AuthenticationService, AUTHENTICATED_USER } from 'src/app/services/authentication.service';

import { BackendService } from 'src/app/services/backend.service';
import { User } from 'src/app/shared/register/user.model';
import { Address } from './address.model'; 
import { FinalOrder, OrderItem } from './finalOrder.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private backendService: BackendService) { } 
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  method: string;
  user: User = new User('',false,'','');
  all_methods: string[] = ['Cash', 'Credit Cards'];
  orderSaved:boolean = false;
  dataLoading=false;
  contact: string='contact';
  address: string='address';
  city:string='city';
  savedOrderWithRealID : FinalOrder;
  adresa:Address = new Address('','','',null);
  private querySubscription;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.dataLoading=true;
    if(this.auth.isUserLoggedIn()){
      let username = sessionStorage.getItem(AUTHENTICATED_USER);
      
      this.querySubscription = this.backendService.getUserByUsername(username).subscribe(
        data => {
          this.user = data;
          this.dataLoading=false;
        }
      )
    }
  }
  populateAddress(firstFormGroup:NgForm){
    this.city = firstFormGroup.value.city;
    this.address = firstFormGroup.value.address;
    this.contact = firstFormGroup.value.phone;
    console.log('City: ', this.city);
    
    console.log('Adress: ', this.address)
    
    console.log('Contact: ', this.contact)
    
    this.adresa = new Address(this.address, this.city,this.contact, this.user);
  }
  finalize(){
    var order = new FinalOrder (this.adresa,this.user.cart.total, this.method,[],this.user);
    this.backendService.saveOrder(order).subscribe(
      data => {
        this.savedOrderWithRealID = data;
        this.orderSaved = true;
        for(let i of this.user.cart.items){
          let item = new OrderItem(i.product,i.countProducts,i.total,this.savedOrderWithRealID);
          this.saveItem(this.savedOrderWithRealID.id, item);
        }
      }
    );
  }
  saveItem(id, item:OrderItem){
      this.querySubscription = this.backendService.saveItemsForOrderID(id,item).subscribe(
        response => {
          console.log('Saving response...',response)
        }
      );
  }
  ngOnDestroy(){
    this.querySubscription.unsubscribe();
  }
}
