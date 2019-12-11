import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { ThemePalette } from '@angular/material';
import { BackendService } from 'src/app/services/backend.service';
import { AuthenticationService, AUTHENTICATED_USER, ITEMS_NUMBER, ROLE } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() color: ThemePalette;
  @Input() helpTitle: string;
  counter = 0;
  userStatusColor = "warn";
  userLoggedIn: boolean = false;
  adminLoggedIn: boolean = false;
  constructor(
    private _backendservice :BackendService, 
    private authService: AuthenticationService,
    private router : Router,
    private _cartService: CartService) { }

  ngOnInit() {
    this.userLoggedIn = this.authService.isUserLoggedIn();
    console.log('Ulogovan je admin/ user: ',sessionStorage.getItem(ROLE))
    this._cartService.share.subscribe(
      response => {
        this.counter = response;
      }
    )
    if(this.userLoggedIn){
      if(sessionStorage.getItem(ROLE) === 'admin') {
        this.adminLoggedIn=true;
      }
      let username = sessionStorage.getItem(AUTHENTICATED_USER);
      this._backendservice.getCart(username).subscribe(
        data => {
          this._cartService.updateItemsNumber(data.itemsNumber);
        }
      )
    }
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
