import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private modelName = 'courses';
  constructor(private _http: HttpService) { }

  getAllForAdmin()
  {
    return this._http.get(`/${this.modelName}`);
  }

  getAllForPublic()
  {
    return this._http.get(`/${this.modelName}/public`);
  }

  getDeleted()
  {
    return this._http.get(`/${this.modelName}/deleted`)
  }

  getCourseCover(id: string, fileName: string)
  {
    return this._http.get(`/${this.modelName}/cover/${id}/${fileName}`)
  }

  getCourseImage(id: string, imageName: string)
  {
    return this._http.get(`/${this.modelName}/cover/${id}/${imageName}`);
  }

  showAdminCourse(id: string)
  {
    return this._http.get(`/${this.modelName}/${id}`);
  }

  showPublicCourse(id: string)
  {
    return this._http.get(`/${this.modelName}/public/${id}`);
  }

  getCourseDetailsUser(id: string)
  {
    return this._http.get(`/${this.modelName}/user/${id}`);
  }

  getCourseAttachmentsForUser(id: string, fileName: string)
  {
    return this._http.get(`/${this.modelName}/user/attachment/${id}/${fileName}`)
  }

  getCourseAttachmentsForAdmin(id: string, fileName: string)
  {
    return this._http.get(`/${this.modelName}/attachment/${id}/${fileName}`)
  }

  add(body: any, httpConfig?: object)
  {
    return this._http.post(`/${this.modelName}`, body, {headers: {...httpConfig}});
  }

  patch(id: string, body: any)
  {
    return this._http.patch(`/${this.modelName}/${id}`, body);
  }

  changePublishStatus(id: string)
  {
    return this._http.patch(`/${this.modelName}/publish/${id}`, '');
  };

}
