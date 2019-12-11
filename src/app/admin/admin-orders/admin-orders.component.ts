import { Component, OnInit, OnDestroy } from '@angular/core';
import { FinalOrder, OrderItem } from 'src/app/users/orders/finalOrder.model';
import { MatTableDataSource } from '@angular/material';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  detailsDisplayed = false;
  orders: any[];
  dataLoading : boolean = false;
  items: OrderItem[] = [];
  private querySubs;
  selectedOrder: FinalOrder;
  orderFinished: boolean = false;
  displayedColumns: string[] = ['id', 'date', 'address','customer','total','method','action'];
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
    this.querySubs = this._backendService.getOrders().subscribe(
      data => {
        this.orders = data;
        console.log(data);
        this.dataLoading = false;
        this.dataSource = new MatTableDataSource(this.orders);
      }
    )
  }
  displayDetails(order){
    console.log('Pozvana metoda: ', order);
    this.dataLoading = true;
    this.selectedOrder = order;
    this.querySubs = this._backendService.getOrderItemsById(order.id).subscribe(
      data => {
        this.items = data;
        this.dataLoading = false;
      }
    )
  }
  finishOrder(selectedOrder){
    this.querySubs = this._backendService.finishOrder(selectedOrder.id,selectedOrder).subscribe(
      data => {
        this.selectedOrder = data;
        this.dataLoading = false;
      }
    )
  }

  ngOnDestroy(){
    this.querySubs.unsubscribe();
    
  }

}
