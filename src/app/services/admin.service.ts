import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  loggedStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _httpClient: HttpService, private _router: Router) {
    this.setLoggedStatus(this.isLogged());
  }

  isLogged()
  {
    return !!localStorage['accesstoken'];
  }

  getLoggedStatus()
  {
    return this.loggedStatus.asObservable();
  }

  setLoggedStatus(status: boolean)
  {
    this.loggedStatus.next(status);
  }

  login(body: any)
  {
    return this._httpClient.post('/admin/login', body);
  }

  logout()
  {
    localStorage.clear();
    this.setLoggedStatus(false);
    this._router.navigateByUrl('/login');
  }

    saveAdminLoginData(response: Object) {
        // @ts-ignore
      localStorage['accesstoken'] = response['accesstoken'];
        // @ts-ignore
      localStorage['refreshtoken'] = response['refreshtoken'];
        // @ts-ignore
      localStorage['user'] = JSON.stringify(response['user']);

    }

  getToken() {
    return localStorage['accesstoken'] || '';
  }
}

/**
 * {
 *   "email": "bravespirit@gmail.com",
 *   "password": "spV0&kE5$o$t"
 * }
 */