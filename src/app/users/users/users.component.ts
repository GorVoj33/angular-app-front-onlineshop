import { Component, OnInit } from '@angular/core';

import { AUTHENTICATED_USER, AuthenticationService, ROLE } from 'src/app/services/authentication.service';
import { User } from 'src/app/shared/register/user.model';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  //user: User = new User("nekipass",false,"testtest@gmail.com","Ime Prezime");
  user:User = new User('',false,'','');
  role : string = '';
  showUser : boolean = false;
  private querySubscription;
  dataLoading = false;
  error : boolean = false;
  passwordCorrect = false;
  updateAllowed :boolean= false;
  errorMessage : string = '';
  constructor(private backendService: BackendService, 
    private authService: AuthenticationService,
    private router : Router) { }

  ngOnInit() {
    //console.log('Username pre: '+this.username);
    let username = sessionStorage.getItem(AUTHENTICATED_USER);
    this.role = sessionStorage.getItem(ROLE);
    this.querySubscription = this.backendService.getUserByUsername(username).subscribe(
      data => {
        this.user = data;
        console.log('User loaded: ',this.user)
        this.dataLoading=false;
      }
    )
    //console.log('Username posle: '+this.username);
    // moram da povuces logovanog korisnika, ako nije da mu se prikaze login
  }

  showDetails(){
    this.showUser = !this.showUser;
  }
  checkPassword(formData){
    let pass = formData.value.password;
    console.log('PASS: ',pass);
    this.dataLoading = true;
    this.backendService.checkPass(this.user.email,pass).subscribe(
      data => {
        if(data===true){
          console.log('Provera je uspesna')
          this.updateAllowed = true;
          this.passwordCorrect = true;
          this.error = false;
        }
        if(data===false){
          this.error = true;
          this.errorMessage = 'You entered wrong password.'
          console.log('Provera nije uspesna')
        }
        
        this.dataLoading = false;
        console.log('odg: ',data);
        this.showUser =false;
        
      },
      error => {
        this.passwordCorrect = false;
        this.dataLoading = false;
        this.errorMessage = 'Something bad happened. Try later.'
        this.error = false;
        this.showUser =false;
        this.updateAllowed = false;
      }
    )
  }

  updateUser(formData2){
    let pass = formData2.value.password;
    let re_pass = formData2.value.retyped_password;

    if(pass === re_pass){
      let email= formData2.value.email;
      console.log('Pass: ',pass, ' email: ',email);
      this.user.email = email;
      this.user.password = pass;
      this.backendService.updateUser(this.user.id, this.user).subscribe(data => {
        this.updateAllowed=false;
        // this.error= true;
        // this.errorMessage='Your credentials are successfuly updated.';
        console.log('Update finished: ', data);
        this.authService.logout();
        this.router.navigate(['login']);
      })
    }else {
      this.error=true;
      this.errorMessage = 'Your passwords are not matching, please type again.';
    }
    

  }

}
