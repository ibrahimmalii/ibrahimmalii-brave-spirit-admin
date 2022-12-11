import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../../services/course.service";

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _courseService: CourseService) { }

  course: any;
  courseId?: string;
  courseNameForPreview?: string;
  ngOnInit(): void {
    this._activatedRoute.params.subscribe((data) => {
      if(data.id) {
        this.courseId = data.id;
        this.getCourseDetails(data.id);
      }
    })
  }

  getCourseDetails(id: string){
    this._courseService.showAdminCourse(id).subscribe((response)=>{
      // @ts-ignore
      this.course = response['course'];
      this.courseNameForPreview = this.course['cover'];
      console.log(this.course);
    });
  }

}
