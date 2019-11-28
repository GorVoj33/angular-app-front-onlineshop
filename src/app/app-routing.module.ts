import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './shared/about-us/about-us.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { SetproductComponent } from './admin/setproduct/setproduct.component';
import { AdminOptionsComponent } from './admin/admin-options/admin-options.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { ProductsComponent } from './users/products/products.component';

const routes: Routes = [
  {path:'', redirectTo:'/about-us', pathMatch:'full'},
  {path:'about-us', component:AboutUsComponent},
  {path:'settings', component:SettingsComponent},
  {path:'admin', component:AdminOptionsComponent},
  {path:'login', component:LoginComponent},
  {path:'products', component: ProductsComponent},
  {path:'register', component:RegisterComponent},
  {path:'**', redirectTo:'/login', pathMatch:'full'}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
  
})
export class AppRoutingModule { }
