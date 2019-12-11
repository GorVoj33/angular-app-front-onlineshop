import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService, AUTHENTICATED_USER } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { User } from 'src/app/shared/register/user.model';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit,OnDestroy {
  u : User;
  dataLoading = false;
  private querySubscription;
  constructor(private auth: AuthenticationService, private bck : BackendService) { }

  ngOnInit() {
    this.dataLoading=true;
    if(this.auth.isUserLoggedIn()){
      let username = sessionStorage.getItem(AUTHENTICATED_USER);
      
      this.querySubscription = this.bck.getUserByUsername(username).subscribe(
        data => {
          this.u = data;
          // console.log('Pristigao user: ', data.cart.items);
          // for (let i of data.cart.items){
          //   console.log('iTEM: ',i.product.name);
          // }
          //console.log('pre konverta ' ,this.u);
          //this.u = this.transformJsonToTs(data);
          //console.log('Posle konverta ' ,this.u.name);
          //console.log('shoping karta stigla: ',data);
          
          // console.log('shoping karta stigla.',data['itemsNumber'],'.ukupno: ',data['total'], ' din.');
          // console.log('a odmah nakon toga stigla.',this.cart.getTotal(),'...', this.cart.getItems().length, ' komada u korpi.');
        }
      )
    }
  }
  transformJsonToTs(data){
    return new User(data['id'],data['password'], data['admin'], data['email'],data['name']);
  }

  ngOnDestroy(){
    this.querySubscription.unsubscribe();
  }
}
