import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// import {AngularFireAuth} from '@angular/fire/auth';

import { HttpClient } from '@angular/common/http';
import { Product, Category } from '../users/products/products.component';
import { User } from 'src/app/shared/register/user.model';
import { Cart } from '../users/carts/carts.model';

import { FinalOrder, OrderItem } from '../users/orders/finalOrder.model';
import { Message } from '../shared/about-us/message.model';
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) { }
  updateCart(cart: Cart) {
    var cartId = cart.id;
    return this.http.put(`http://localhost:8080/rest/cart/${cartId}`, cart);
  }
  getProductsByCategoryId(categoryId){
    return this.http.get<Product[]>(`http://localhost:8080/rest/categories/${categoryId}`);
  }
  getProductsByFilter(searchValue){
    return this.http.get<Product[]>(`http://localhost:8080/rest/products/filter/${searchValue}`);
  }
  registerUser(newUser) {
    return this.http.post('http://localhost:8080/rest/users/register', newUser);
  }
  
  getUserByUsername(username) {
    return this.http.get<any>(`http://localhost:8080/rest/users/username/${username}`);
  }
  deleteItemFromCart(cartId, itemId){
    return this.http.delete<Cart>(`http://localhost:8080/rest/cart/${cartId}/delete/item/${itemId}`);
  }
 
  getProducts(){
    return this.http.get<Product[]>('http://localhost:8080/rest/products');
  }
  getOnlyActiveProducts(){
    return this.http.get<Product[]>('http://localhost:8080/rest/products/active');
  }
  getCategories(){
    return this.http.get<Category[]>('http://localhost:8080/rest/categories');
  }
  getFilterData(filter){
    return this.http.get<Product[]>(`http://localhost:8080/rest/products/filter/${filter}`);
  }
  saveProduct(product){
    return this.http.post('http://localhost:8080/rest/products', product);
  }
  getCart(username){
    return this.http.get<Cart>(`http://localhost:8080/rest/cart/username/${username}`);
  }

  updateProduct(product,id) {
    return this.http.put(`http://localhost:8080/rest/products/${id}`,product);
  }

  getObjectById(objectType, id){
    return this.http.get(`http://localhost:8080/rest/${objectType}/${id}`);
  }
  saveOrder(order){
    return this.http.post<FinalOrder>('http://localhost:8080/rest/order',order);
  }

  checkPass(email, pass){
    return this.http.get<boolean>(`http://localhost:8080/rest/users/${email}/${pass}`);
  }

  updateUser(userId, user){
    return this.http.put(`http://localhost:8080/rest/users/${userId}`,user);
  }

  getUsers(){
    return this.http.get<User[]>('http://localhost:8080/rest/users');
  }

  getOrders(){
    return this.http.get<[]>('http://localhost:8080/rest/orders');
  }
  getOrdersById(id){
    return this.http.get<FinalOrder>(`http://localhost:8080/rest/orders/${id}`);
  }
  getOrderItemsById(id){
    return this.http.get<OrderItem[]>(`http://localhost:8080/rest/orders/${id}/items`);
  }
  getCarts(){
    return this.http.get<Cart[]>('http://localhost:8080/rest/carts');
  }
  saveMessage(message){
    return this.http.post<boolean>('http://localhost:8080/rest/messages', message);
  }
  getMessages(){
    return this.http.get<Message[]>('http://localhost:8080/rest/messages');
  }
  saveCategory(category){
    return this.http.post<boolean>('http://localhost:8080/rest/categories', category);
  }
  saveItemsForOrderID(order_id, item){
    return this.http.post<boolean>(`http://localhost:8080/rest/order/${order_id}/items/save`, item);
  }
  finishOrder(id, order){
    return this.http.put<FinalOrder>(`http://localhost:8080/rest/orders/finish-order/${id}`,order);
  }
}
