import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse, HttpContextToken, HttpErrorResponse
} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AdminService} from "../services/admin.service";

export const IGNORE_REQUEST = new HttpContextToken(() => false);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _adminService: AdminService) {}



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
        setHeaders: {
            Authorization: `Bearer ${this._adminService.getToken()}`
        }
    });
  if (req.context.get(IGNORE_REQUEST)) {
      return next.handle(req);
  }
  return next.handle(request);

  }
}
