import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { User } from './user.model';
import { moveIn, fallIn } from '../../router.animation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class RegisterComponent implements OnInit {
  state: string = '';
  error: any;
  dataLoading: boolean = false;
  brokenNetwork = false;
  savedChanges = false;
  constructor(private _backendService: BackendService, private router : Router) { }
  routeLoginPage (){
    this.router.navigate(['/login']);
  }
  ngOnInit() {}
  onSubmit(formData) {
    this.saveUser(formData);
    
  }
  saveUser(formData){
    let newUser: User = {
      password: formData.value.password,
      isAdmin: false,
      email : formData.value.email,
      name : formData.value.name,
    }
    this.dataLoading = true;
    this._backendService.registerUser(newUser).subscribe(
        success =>
        {
          console.log(success)
          this.dataLoading = false;
          this.savedChanges = true;
          this.routeLoginPage()
        }
        // (error) => {
        //   this.error = error;
        //   this.dataLoading = false;
        //   this.savedChanges = false;
        // }
      )
  }
}
