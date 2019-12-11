import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable, from} from 'rxjs';
// import { take } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthGlobalService implements CanActivate{
  constructor(private _authService: AuthenticationService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isUserLoggedIn()) {
        return true;
    }

    // navigate to login page
    this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
  // constructor(private router:Router, private auth: AuthenticationService) { }
  // canActivate() {
  //   var o = from(this.auth.isUserLoggedIn)
  //   .pipe(take(1))
  //   .map(state => !!state)
  //   .do(authenticated =>{
  //     if(!authenticated)
  //     this.router.navigate(['/login']);
  //   })
  // }
}
