import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthServiceService} from "./auth-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private  authService: AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.params.get('intercept'));

    if (request.params.get('intercept')) {
      return next.handle(request);

    }
    console.log("B");

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    })

    return next.handle(request);
  }
}
