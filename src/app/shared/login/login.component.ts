import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

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

  constructor(private _backendService : BackendService) { }

  ngOnInit() {
    this.userLoggedIn = false;
    this.getAuthStatus();
  }

  // formData is used for authentication by email+password (cause it's optional argument)
  login(type, formData?){
    this.dataLoading = true;
    return this._backendService.login(type, formData);
    /*then().catch(
      (err) => {
        this.error = true;
        this.errorMessage = err.message;
        this.userLoggedIn = false;
        this.dataLoading = false;
      }
    );*/
  }
  logout (){
    this.dataLoading = true;
    return this._backendService.logout().then (
      (success) => {
        this.userLoggedIn = false;
        this.dataLoading = false;
      }
    );
  }
  getAuthStatus(){
    this.dataLoading = true;
    this._backendService.redirectLogin().then(
      function(result){
        if(result.credential){
          this.dataLoading=false;
          if(result.credential["accessToken"] != ""){
            return this.userLoggedIn = true;
          }
          
          console.log(result.credential)
        }
      }

    ).catch(
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.userLoggedIn = false;
        this.dataLoading = false;
      }
    );
  }

}
