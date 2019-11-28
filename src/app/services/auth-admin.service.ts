import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService{

  constructor(public afAuth:AngularFireAuth, private router : Router) { }
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
