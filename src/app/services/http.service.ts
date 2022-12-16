import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string, headerConfig?: any, otherOptions?: object)
  {
    console.log('before log');
    return this.http.get(environment.baseUrl + url, {headers: {...headerConfig}, ...otherOptions});
  }

  post(url: string, body: any, headerConfig?: object)
  {
    return this.http.post(environment.baseUrl + url, body, {headers: {...headerConfig}});
  }

  put(url: string, body: any, headerConfig?: object)
  {
    return this.http.put(environment.baseUrl + url, body, {headers: {...headerConfig}});
  }

  patch(url: string, body: any, headerConfig?: object)
  {
    return this.http.patch(environment.baseUrl + url, body, {headers: {...headerConfig}});
  }

  delete(url: string, id: any, headerConfig?: object)
  {
    return this.http.delete(`${environment.baseUrl}${url}/${id}`, {headers: {...headerConfig}});
  }

}
