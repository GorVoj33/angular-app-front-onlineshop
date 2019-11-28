import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Product } from '../users/products/products.component';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(public afAuth : AngularFireAuth, private http: HttpClient) { }
  redirectLogin(){
    return this.afAuth.auth.getRedirectResult();
  }
  //type references to 'facebook' or 'google' or something similar
  login(type, formData){
     
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    if(formData){
      return this.afAuth.auth.signInWithEmailAndPassword(formData.email, formData.password);

    }
    let login = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithRedirect(login);
    
  }
  logout (){
    return this.afAuth.auth.signOut();
  }
  isUserLoggedIn (){

    return this.afAuth.authState;
  }
  getCartItemsNumber(){
    let res = "10";
    return Observable.create(
      observer => {
        setTimeout(() => 
         {observer.next(res)}, 2000)
      }
    )
  }

  isUserLogged (){
    let res = true;
    return Observable.create(
      observer => {
        setTimeout(() => 
         {observer.next(res)}, 2000)
      }
    )

  }
  getProducts(type){
    return this.http.get<Product[]>('http://localhost:8080/rest/products');
  }
  getFilterData(filter){
    let fakeResponse = [{
      'category':'cat1',
      'name':'name1',
      'price':'123',
      'unitsInStock':'2',
      'path': 'abcd'
    },
    {
      'category':'kat2',
      'name':'ime2',
      'price':'333',
      'unitsInStock':'4'
    }];
    return Observable.create(
      observer => {
        setTimeout(() => 
         {observer.next(fakeResponse)}, 2000)
      }) 
  }


  setProducts(type, filter) {
    let res = true;
    return Observable.create(
      observer => {
        setTimeout(() => 
         {observer.next(res)}, 2000)
      }
    )
  }
  updateProducts(type, filter) {
    let res = true;
    return Observable.create(
      observer => {
        setTimeout(() => 
         {observer.next(res)}, 2000)
      }
    )
  }

}
