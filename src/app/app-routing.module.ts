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
import { UsersComponent } from './users/users/users.component';
import { CartsComponent } from './users/carts/carts.component';
import { OrdersComponent } from './users/orders/orders.component';
import { CartItemComponent } from './users/carts/cart-item/cart-item.component';
import { AuthAdminService } from './services/auth-admin.service';
import { AuthGlobalService } from './services/auth-global.service';

const routes: Routes = [
  {path:'', redirectTo:'/about-us', pathMatch:'full'},
  {path:'about-us', component:AboutUsComponent},
  {path:'settings', component:SettingsComponent},
  {path:'user-profile-settings', component:UsersComponent, canActivate:[AuthGlobalService]},
  {path:'admin', component:AdminOptionsComponent,canActivate:[AuthAdminService] },
  {path:'manage-products', component:SetproductComponent},
  {path:'login', component:LoginComponent},
  {path:'products', component: ProductsComponent},
  {path:'products/category/:id', component: ProductsComponent},
  {path:'cart',component: CartsComponent},
  {path:'register', component:RegisterComponent},
  {path:'createOrder', component:OrdersComponent},
  {path:'cart-test', component:CartItemComponent},
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
