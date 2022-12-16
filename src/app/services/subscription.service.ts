import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private modelName = 'subscriptions';

  constructor(private _http: HttpService) { }

  getAll() {
    return this._http.get(`/${this.modelName}`);
  }

}
