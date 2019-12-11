import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/users/products/products.component';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  //categories: string[] = ['Prva','Druga','Treca','Cetvrta'];
  categories: Category[];

  constructor(private _backendService: BackendService,
    private router: Router) { }

  ngOnInit() {
    this._backendService.getCategories().subscribe(
      data => {
        console.log('Kategorije: ',data);
        this.categories = data;
      }
    )
  }
  onSelect(category_id){
    this.router.navigate(['/products/category',category_id]);

  }
}
