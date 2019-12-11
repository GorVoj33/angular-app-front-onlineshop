import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/about-us/message.model';
import { MatTableDataSource } from '@angular/material';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class AdminMessagesComponent implements OnInit {

  detailsDisplayed = false;
  dataLoading : boolean = false;
  private querySubs;
  selectedMessage: Message;
  displayedColumns: string[] = ['id', 'date', 'name','email','action'];
  //dataSource = new MatTableDataSource(this.users);
  dataSource: MatTableDataSource<any>;
  messages: Message[];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private _backendService: BackendService
  ) { }

  ngOnInit() {
    this.dataLoading = true;
    this.querySubs = this._backendService.getMessages().subscribe(
      data => {
        this.messages = data;
        console.log(data);
        this.dataLoading = false;
        this.dataSource = new MatTableDataSource(this.messages);
      }
    )
  }
  displayDetails(msg){
    
    //this.dataLoading = true;
    this.selectedMessage = msg;
  }


  ngOnDestroy(){
    this.querySubs.unsubscribe();
    
  }

}
