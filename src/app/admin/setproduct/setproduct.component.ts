import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BackendService } from 'src/app/services/backend.service';


@Component({
  selector: 'app-setproduct',
  templateUrl: './setproduct.component.html',
  styleUrls: ['./setproduct.component.css']
})
export class SetproductComponent implements OnInit {
  field: string;
  dataSource: MatTableDataSource<any>;
  members: any[];
  savedChanges = false;
  error:boolean = false;
  errorMessage: String = "No error yet";
  dataLoading: boolean = false;
  private querySubscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: String[] = ['name', 'category','price','unitsInStock','_id'];
  constructor(private _backendService: BackendService) { }

  ngOnInit() {
    this.field = "searchMode";
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
  displayMode(filter?){
    if(!filter) {filter = "searchMode"}
    else {filter=filter}
    this.field = filter;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getData(){
    this.dataLoading = true;
    this.querySubscription = this._backendService.getProducts('product').
    subscribe(members => {
      this.members = members;
      this.dataSource = new MatTableDataSource(members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort
    },
    (error)=> {
      this.error=true;
      this.errorMessage = error.message;
      this.dataLoading=false;
    },
    ()=> {
      this.error=false;
    this.dataLoading=false;
  })
  }

  getFilterData(){
    this.dataLoading = true;
    this.querySubscription = this._backendService.getFilterData('product').
    subscribe(members => {
      this.members = members;
      this.dataSource = new MatTableDataSource(members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort
    },
    (error)=> {
      this.error=true;
      this.errorMessage = error.message;
      this.dataLoading=false;
    },
    ()=> {
      this.error=false;
    this.dataLoading=false;
  })
  }
  setData(formData){
    this.dataLoading = true;
    this.querySubscription = this._backendService.setProducts('product',formData).
    subscribe(members => {
      if(members){
        this.savedChanges = true;
      }
    },
      
    (error)=> {
      this.error=true;
      this.errorMessage = error.message;
      this.dataLoading=false;
    },
    ()=> {
      this.error=false;
    this.dataLoading=false;
  })
  }
  updateData(formData){
    this.dataLoading = true;
    this.querySubscription = this._backendService.updateProducts('product',formData).
    subscribe(members => {
      if(members){
        this.savedChanges = true;
      }
    },
      
    (error)=> {
      this.error=true;
      this.errorMessage = error.message;
      this.dataLoading=false;
    },
    ()=> {
      this.error=false;
    this.dataLoading=false;
  })
  }

  ngOnDestroy(){
    this.querySubscription.unsubscribe();
  }
}
