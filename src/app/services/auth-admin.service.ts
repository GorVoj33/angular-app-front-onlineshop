import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthenticationService, ROLE } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService implements CanActivate{
  constructor(private _router:Router, private _authService: AuthenticationService){}
  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userLoggedIn = this._authService.isUserLoggedIn;
    let role = sessionStorage.getItem(ROLE);
    if(userLoggedIn){
      if (role === 'admin') {
        return true;
      }
  
    }
    
    // navigate to not found page
    this._router.navigate(['/login']);
    return false;
  }






  //constructor(public afAuth:AngularFireAuth, private router : Router) { }
  //canActivate() {
  //   return Observable.from(this.afAuth.authState)
  //   .take(1)
  //   .map(state => !!state)
  //   .do(auth => {
  //     if (!auth) {
  //       this.router.navigate(['/login']);
  //     }
  //   });
  // }
}
