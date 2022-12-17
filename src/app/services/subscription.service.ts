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

    getRequests() {
      return this._http.get(`/${this.modelName}/requests`);
    }

  getProofFile(id: string) {
    return this._http.get(`/${this.modelName}/proof/${id}`);
  }

  approve(id: string) {
    return this._http.get(`/${this.modelName}/confirm/${id}`);
  }

  decline(id: string) {
    return this._http.get(`/${this.modelName}/decline/${id}`);
  }
}
