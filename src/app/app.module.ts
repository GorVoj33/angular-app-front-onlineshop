import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AboutUsComponent } from './shared/about-us/about-us.component';
import { AppRoutingModule } from './app-routing.module';
import { CustommaterialModule } from './custommaterial.module';
import { SettingsComponent } from './settings/settings.component';
import { MatToolbarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SetproductComponent } from './admin/setproduct/setproduct.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminCartsComponent } from './admin/admin-carts/admin-carts.component';
import { AdminOptionsComponent } from './admin/admin-options/admin-options.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { UsersComponent } from './users/users/users.component';
import { OrdersComponent } from './users/orders/orders.component';
import { CartsComponent } from './users/carts/carts.component';
import { ProductsComponent } from './users/products/products.component';


import { MatButtonModule } from '@angular/material/button';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    SettingsComponent,
    SetproductComponent,
    AdminCartsComponent,
    AdminOptionsComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    UsersComponent,
    OrdersComponent,
    CartsComponent,
    ProductsComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustommaterialModule,
    MatToolbarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'e-commerce-web-app'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,       
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
