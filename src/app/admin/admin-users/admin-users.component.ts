import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/register/user.model';
import { BackendService } from 'src/app/services/backend.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit,OnDestroy {
  users: User[];
  dataLoading : boolean = false;
  private querySubs;
  displayedColumns: string[] = ['id', 'name', 'email'];
  //dataSource = new MatTableDataSource(this.users);
  dataSource: MatTableDataSource<any>;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private _backendService: BackendService
  ) { }

  ngOnInit() {
    this.dataLoading = true;
    this.querySubs = this._backendService.getUsers().subscribe(
      data => {
        this.users = data;
        console.log(data);
        this.dataLoading = false;
        this.dataSource = new MatTableDataSource(this.users);
      }
    )
  }
  ngOnDestroy(){
    this.querySubs.unsubscribe();
  }
  
}
