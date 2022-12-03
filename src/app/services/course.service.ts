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

  deleteCourse(id: string) {
    return this._http.delete(`/${this.modelName}/`, id)
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
    const course = structuredClone(body);
    const data = new FormData();
    if(course.cover){
      data.append('cover', course.cover, course.cover?.name);
    }
    course.images.forEach((file: any, index: number) => { data.append(`image${index + 1}`, file, file?.name); });
    course.chapters.forEach((chapter: any, chapterIndex: number) => {
      chapter.files.forEach((file: any, fileIndex: number) => {
        file.binaryAttachments.forEach((attachment: any, attachIndex: number) => {
          data.append(`attachment${chapterIndex}${fileIndex}${attachIndex}`, attachment, attachment?.name)
        });
        delete file.binaryAttachments;
      });
    });

    const courseImagesNames = course.images.map((item: any) => item.name);

    const newCourse = {
      cover : course?.cover?.name,
      name : course.name,
      description : course.description,
      zipped_description : course.zipped_description,
      price : course.price,
      discount : course.discount,
      published : course.published,
      get_free : course.get_free,
      chapters : course.chapters,
      images : courseImagesNames
    };
    const courseFile = new Blob([JSON.stringify(newCourse)], {
      type: 'application/json',
    });
    data.append('data', courseFile);
    return this._http.post(`/${this.modelName}`, data, {headers: {...httpConfig}});
  }

  patch(id: string, body: any)
  {
    return this._http.patch(`/${this.modelName}/${id}`, body);
  }

  changePublishStatus(id: string)
  {
    return this._http.patch(`/${this.modelName}/publish/${id}`, '');
  };


    changePaidStatus(id: string) {
      return this._http.patch(`/${this.modelName}/paidOrFree/${id}`, '');
    }
}
