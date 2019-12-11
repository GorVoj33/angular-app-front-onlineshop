import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BackendService } from 'src/app/services/backend.service';
import { Category, Product } from 'src/app/users/products/products.component';
import { trigger } from '@angular/animations';
export interface CategoryOption {
  value: Category;
  viewValue: string;
}

@Component({
  selector: 'app-setproduct',
  templateUrl: './setproduct.component.html',
  styleUrls: ['./setproduct.component.css']
})
export class SetproductComponent implements OnInit {
  categoryOptions: CategoryOption[] = [];
  field: string;
  dataSource: MatTableDataSource<any>;
  members: Product[];
  savedChanges = false;
  error:boolean = false;
  errorMessage: String = "No error yet";
  dataLoading: boolean = false;
  categorySaved: boolean = false;
  private querySubscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  categories: Category[];
  displayedColumns: String[] = ['name', 'category','price','unitsInStock','_id'];
  selectedCategory: Category = new Category(0,'');
  //loadedProduct: Product = new Product(0,'','',0,0,false,this.selectedCategory);
  loadedProduct: any;
  
  constructor(private _backendService: BackendService) { }

  ngOnInit() {
    this.field = "searchMode";
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllCategories();
    
  }

  makeOptions() {
    for (const [id, vrednost] of Object.entries(this.categories)){
      this.categoryOptions.push({value: vrednost, viewValue: vrednost.name});
    }
  }
  getAllCategories() {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getCategories()
    .subscribe(
      (allCategories) => {
        
        this.categories = allCategories;
        this.selectedCategory = this.categories[0];
        this.dataLoading = false;
        this.makeOptions();
        
      },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.error = false;
        this.dataLoading = false;
      }
    );
    
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
    this.querySubscription = this._backendService.getProducts().
    subscribe(members => {
      this.members = members;
      console.log('Naziv ucitanog: ', this.members[0].name, ' dok je is act: ',this.members[0].active)
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

  getFilterData(filterValue){
    console.log('filter value je ',filterValue['name']);
    if(filterValue['name'] === '') return;
    this.dataLoading = true;
    this.querySubscription = this._backendService.getFilterData(filterValue['name']).
    subscribe(members => {
      this.members = members;
      console.log('Naziv ucitanog: ', this.members[0].name, ' dok je is act: ',this.members[0].active)
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
    console.log('selektovana kat je : ',this.selectedCategory)
    var newProduct: Product={
      name: formData.value.name,
      description: formData.value.descr,
      price: formData.value.price,
      unitsInStock: formData.value.unitsInStock,
      active: true,
      category: this.selectedCategory
    }
    
    console.log('Nakon pokusaja cuvanja: ime: ', newProduct.name,' ,cat: ', newProduct.category)
    this.dataLoading = true;
    this.querySubscription = this._backendService.saveProduct(newProduct).
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
  changeStatusProduct(product, id){
    product.active = !product.active;
    console.log('Naziv : '+product.name + ' ,isact: ',product.active)
    this.querySubscription = this._backendService.updateProduct(product, id).
    subscribe(members => {
      if(members){
        this.savedChanges = true;
      }
    });
  }  
  getDoc(docId) {
    this.dataLoading = true;
    console.log('Doc id : '+docId);
    this.querySubscription = this._backendService.getObjectById('products', docId)
        .subscribe(res => {
            this.loadedProduct = res;
            this.displayMode('editMode');
            this.dataLoading = false;
            this.selectedCategory = this.loadedProduct.category;
        },
            (error) => {
                this.error = true;
                this.errorMessage = error.message;
                this.dataLoading = false;
            },
            () => { this.error = false; this.dataLoading = false; });
  }
  updateData(formData){
    //formData.tags = formData.tags.split(',');
        if (confirm("Are you sure want to update this record ?")) {
            this.loadedProduct.category = this.selectedCategory;
            this.loadedProduct.name = formData.value.name;
            this.loadedProduct.description = formData.value.description;
            this.loadedProduct.price = formData.value.price;
            this.loadedProduct.unitsInStock = formData.value.unitsInStock;
            this.dataLoading = true;
            this.querySubscription=this._backendService.updateProduct(this.loadedProduct, this.loadedProduct.id).subscribe(
              (res) => {
                this.error = false;
                this.errorMessage = "";
                this.dataLoading = false;
                this.savedChanges = true;
            });
            // .catch(error => {
            //     this.error = true;
            //     this.errorMessage = error.message;
            //     this.dataLoading = false;
            // });
        }
  }
  saveCategory(catForm){
    let name = catForm.value.cat_name;
    console.log('naziv kat: ', name)
    let cat = new Category(-1, name);
    this.querySubscription = this._backendService.saveCategory(cat).subscribe(
         response => {
           if(response===true){
            this.categorySaved = true;
           }else {
             this.error = true;
             this.errorMessage = 'Problem with saving category, please try later.';
           }
         }
      
    )
  }
  ngOnDestroy(){
    this.querySubscription.unsubscribe();
  }
}
