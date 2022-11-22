import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _httpClient: HttpService) { }

  get(headerConfig?: object)
  {
    return this._httpClient.get('/home', {headers: {...headerConfig}});
  }

  patch(body: any, headerConfig?: object)
  {
    return this._httpClient.patch('/home', body, {headers: {...headerConfig}});
  }

    reset(body: any) {
      return this._httpClient.patch('/home/reset', body);
    }
}
