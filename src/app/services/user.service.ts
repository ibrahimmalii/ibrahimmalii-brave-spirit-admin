import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private _http: HttpService) { }

  getAll(size?: number, page?: number)
  {
    return this._http.get(`/users?size=${size}&page=${page}`);
  }

  getInactive()
  {
    return this._http.get('/users/deleted');
  }

  show(id: string)
  {
    return this._http.get(`/users/${id}`);
  }

  add(body: User, httpConfig?: object)
  {
    return this._http.post('/users', body, {headers: {...httpConfig}});
  }

  patch(id: string, body: User)
  {
    return this._http.patch(`/users/${id}`, body);
  }

  enableAndDisableUser(id: string){
    return this._http.delete('/users', id);
  };

}
