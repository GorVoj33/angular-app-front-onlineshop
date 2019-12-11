import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AuthenticationService, AUTHENTICATED_USER } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLoggedIn = false;
  error: boolean = false;
  errorMessage : String = "";
  dataLoading : boolean = false;
  brokenNetwork : boolean = false;

  constructor(private router: Router,private authService: AuthenticationService) {


   }

  ngOnInit() {
    this.userLoggedIn = this.authService.isUserLoggedIn();
    //this.getAuthStatus();
  }

  // formData is used for authentication by email+password (cause it's optional argument)
  login(formData: NgForm){
    this.dataLoading = true;
    let username = formData.value.email;
    let password = formData.value.password;
    console.log('Kredencijali: ',username,password);
    this.authService.executeJwtAuthentication(username,password)
      .subscribe(data => {
        this.dataLoading = false;
        this.router.navigate(['products']);
      },
      someError => {
        this.dataLoading = false;
        this.error=true;
        this.errorMessage=someError.message;
      })
  }
    //return this._backendService.login(username, password);
    /*then().catch(
      (err) => {
        this.error = true;
        this.errorMessage = err.message;
        this.userLoggedIn = false;
        this.dataLoading = false;
      }
    );*/
  
  // logout (){
  //   this.dataLoading = true;
  //   return this._backendService.logout().then (
  //     (success) => {
  //       this.userLoggedIn = false;
  //       this.dataLoading = false;
  //     }
  //   );
  // }
  // getAuthStatus(){
  //   this.dataLoading = true;
  //   this._backendService.redirectLogin().then(
  //     function(result){
  //       if(result.credential){
  //         this.dataLoading=false;
  //         if(result.credential["accessToken"] != ""){
  //           return this.userLoggedIn = true;
  //         }
          
  //         console.log(result.credential)
  //       }
  //     }

  //   ).catch(
  //     (error) => {
  //       this.error = true;
  //       this.errorMessage = error.message;
  //       this.userLoggedIn = false;
  //       this.dataLoading = false;
  //     }
  //   );
  // }

}
