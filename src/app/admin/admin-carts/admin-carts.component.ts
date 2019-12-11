import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from 'src/app/users/carts/carts.model';
import { BackendService } from 'src/app/services/backend.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-carts',
  templateUrl: './admin-carts.component.html',
  styleUrls: ['./admin-carts.component.css']
})
export class AdminCartsComponent implements OnInit,OnDestroy {
  dataLoading = false;
  carts: Cart[];
  private querySubscription;
  selectedCart: Cart;
  detailsDisplayed:boolean = false;
  //displayedColumns: string[] = ['id','customer','email','total','number','action'];
  displayedColumns: string[] = ['id','total','number','action'];
  //dataSource = new MatTableDataSource(this.users);
  dataSource: MatTableDataSource<any>;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private _backendService: BackendService) { }

  ngOnInit() {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getCarts().subscribe(
      data => {
        this.carts = data;
        this.dataLoading = false;
        this.dataSource = new MatTableDataSource(this.carts);
      }
    )
  }
  displayDetails(cart){
    this.selectedCart = cart;
  }

  ngOnDestroy(){
    this.querySubscription.unsubscribe();
  }

}
