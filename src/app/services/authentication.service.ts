import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'
export const ROLE = 'role'
export const ITEMS_NUMBER = 'items_number'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }
  executeJwtAuthentication(username, password){
    return this.http.post<any>('http://localhost:8080/authenticate', {username,password})
      .pipe(
        map(
          data => {
            console.log('Odgovor na autentifikaciju: ',data)
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN,`Bearer ${data.token}`);
            sessionStorage.setItem(ROLE,data.role);
            sessionStorage.setItem(ITEMS_NUMBER,'0');
          }
        )
      )
  }
  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }
  getAuthenticatedToken() {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }
  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
    sessionStorage.removeItem(ROLE)
  }
}
