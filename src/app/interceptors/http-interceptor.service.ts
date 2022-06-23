import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private userService:UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    const token: string = this.userService.token;

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          'x-token': token 
        }
      });
    }

    return next.handle(request);
  }
}
