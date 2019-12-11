import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from 'src/app/router.animation';
import { Router } from '@angular/router';
import { Message } from './message.model';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn':''}
})
export class AboutUsComponent implements OnInit {
  state: string = '';
  constructor(private router: Router, private _backendService:BackendService) { }
  messageSaved : boolean = false;
  error: boolean = false;
  errorMessage : string = '';
  ngOnInit() {
  }
  sendMessage(contactUsForm){
    let message = contactUsForm.value.message;
    let name = contactUsForm.value.name;
    let email = contactUsForm.value.email;
    console.log('Poruka od: ', name, ' mail: ',email, ' Tekst: ',message)
    let msg = new Message(email,name,message);
    this._backendService.saveMessage(msg).subscribe(
      success =>
        {
          console.log(success)
          if(success===true)
          {
            this.messageSaved = true;
          }else {
            this.messageSaved = false;
            this.error= true;
            this.errorMessage = "Problem with sending message, try later.";

          }
          // this.dataLoading = false;
          // this.savedChanges = true;
          // this.router.navigate(['login']);
        }
    );
  }
  displayProductsByCategory(categoryId){
    this.router.navigate(['/products/category',categoryId]);
  }
}
