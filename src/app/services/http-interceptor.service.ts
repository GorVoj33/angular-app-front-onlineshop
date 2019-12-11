import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let header = this.authService.getAuthenticatedToken();
    let username = this.authService.getAuthenticatedUser();
    if(header && username){
      req = req.clone({
        setHeaders : {
          Authorization: header
        }
      })
    }
    return next.handle(req);
  }

}
