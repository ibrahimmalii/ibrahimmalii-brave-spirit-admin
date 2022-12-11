import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Course} from "../../../models/course";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chapter} from "../../../models/chapter";
import {PopupSettingsModel} from "@syncfusion/ej2-inplace-editor/src/inplace-editor/base/models-model";
import {CourseService} from "../../../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.css']
})
export class AddNewCourseComponent implements OnInit {

  originalChapter: Chapter = new Chapter({ar: '', en: ''}, {ar: '', en: ''}, [{title: {ar: '', en: ''}, link: '', file: '', attachments: [], binaryAttachments: []}]);
  courseObj: Course = new Course(
      {ar: '', en: ''},
      {ar: '', en: ''},
      {ar: '', en: ''},
      '',
      [],
      {euro: 0, dzd: 0},
      0,
      [new Chapter({ar: '', en: ''}, {ar: '', en: ''}, [{title: {ar: '', en: ''}, link: '', file: '', attachments: [], binaryAttachments: []}])],
      '',
      false,
      false,
  );

  public settings: PopupSettingsModel = {
    title: 'Enter title'
  };

  isValidateEnable = true;
  courseNameForm: FormGroup=Object.create(null);
  courseDescriptionForm: FormGroup=Object.create(null);
  courseZippedDescriptionForm: FormGroup=Object.create(null);
  courseCoverForm: FormGroup=Object.create(null);
  coursePriceForm: FormGroup=Object.create(null);

  isUpdate: Boolean = false;

  // About form
  myForm: FormGroup = new FormGroup<any>({});
  isLoaded: boolean = false;

  get f(){
    return this.myForm.controls;
  }

  courseImagesForPreview: string[] = [];
  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = (subEvent:any) => {
          this.courseImagesForPreview.push(subEvent.target.result);
          this.courseObj.images.push(event.target.files[i]);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  deleteCourseImage(index: number) {
    this.courseImagesForPreview.splice(index, 1);
    this.courseObj.images.splice(index, 1);
  }


  constructor(private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              private _courseService: CourseService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((data) => {
      if(data.id) {
        this.isCourseUpdate = true;
        this.getCourseDetails(data.id);
      }
    })

    console.log(this.courseObj);
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      file: ['', [Validators.required]],
      fileSource: ['', [Validators.required]]
    })

    this.courseNameForm = this.fb.group({
      courseName: ['', [Validators.required]]
    });
    this.courseDescriptionForm = this.fb.group({
      courseDescription: ['', [Validators.required]]
    });
    this.courseZippedDescriptionForm = this.fb.group({
      courseZippedDescription: ['', [Validators.required]]
    });
    this.courseCoverForm = this.fb.group({
      courseCover: ['', [Validators.required]]
    });
    this.coursePriceForm = this.fb.group({
      courseEuroPrice: ['', [Validators.required]],
      courseDzdPrice: ['', [Validators.required]]
    })
  }

  courseCoverForPreview: any;
  courseNameForPreview: any;
  changeImage(event:any,  isChapter: boolean = false, chapterIndex:number = 0, fileIndex: number = 0) {
    let reader = new FileReader();
    let file = event.target.files[0];
    console.log('file above', file);
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        if(!isChapter) {
          this.courseCoverForPreview = reader.result;
          this.courseNameForPreview = file.name;
          this.courseObj['cover'] = file;
        } else {
          if (typeof reader.result === "string") {
            this.courseObj['chapters'][chapterIndex]['files'][fileIndex]['file'] = file.name;
          }
        }
      }
      this.cdr.markForCheck();
    }
  }

  onFileChangeOnChapterAttachments(event:any, chapterIndex: number, fileIndex: number) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = (subEvent:any) => {
          this.courseObj.chapters[chapterIndex].files[fileIndex].binaryAttachments.push(event.target.files[i]);
          this.courseObj.chapters[chapterIndex].files[fileIndex].attachments.push(event.target.files[i].name);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  submit() {

  }


  changeCoursePublishStatus() {
    this.courseObj['published'] = !this.courseObj['published'];
  }

  addNewCourse() {
    this.isLoaded = true;
    if(this.isCourseUpdate){
      this.updateCourse();
      return;
    }
    this._courseService.add(this.courseObj).subscribe((res) => {
      this.isFormSubmitted = true;
      this.successOrErrorMsg = 'Course added successfully';
      setTimeout(() => {
        this.hideError();
        this._router.navigateByUrl('/courses');
      }, 3000);
    }, (err) => {
      this.handleResError(err);
      this.isLoaded = false;
    });
  }

  updateCourse() {
    this._courseService.patch(this.courseObj['_id'], this.courseObj)
        .subscribe((res) => {
          this.successOrErrorMsg = 'Course updated successfully';
          this.isFormSubmitted = true;
          setTimeout(() => {
            this.hideError();
            this._router.navigateByUrl('/courses');
          }, 3000);
        }, (err) => {
          this.handleResError(err);
        });
  }

  step = 0;
  fileStep = 0;
  isFormSubmitted: boolean = false;
  successOrErrorMsg: string = '';
  isCourseUpdate: boolean = false;
  publicUrl: string  = environment.baseUrl;

  setStep(index: number) {
    this.step = index;
  }

  setFileStep(index: number){
    this.fileStep = 0;
  }

  addNewChapter() {
   this.courseObj.chapters.push(JSON.parse(JSON.stringify(this.originalChapter)));
  }

  deleteChapter(chapterIndex: number) {
    this.courseObj.chapters.splice(chapterIndex, 1);
  }

  deleteChapterAttachment(chapterIndex: number, fileIndex: number, attachmentIndex: number) {
    this.courseObj.chapters[chapterIndex].files[fileIndex].attachments.splice(attachmentIndex, 1);
    this.courseObj.chapters[chapterIndex].files[fileIndex].binaryAttachments.splice(attachmentIndex, 1);
  }

  deleteFileFromFilesArray(chapterIndex: number, fileIndex: number) {
    this.courseObj.chapters[chapterIndex].files.splice(fileIndex, 1);
  }

  addFileToFilesArray(chapterIndex: number) {
    this.courseObj.chapters[chapterIndex].files.push({title: {ar: '', en: ''}, link: '', file: '', attachments: [], binaryAttachments: []});
  }

  private hideError() {
    this.successOrErrorMsg = '';
    this.isFormSubmitted = false;
    this.isLoaded = false;
  }


  changeCoursePaidOrFreeStatus() {
    this.courseObj['get_free'] = !this.courseObj['get_free'];
  }

  getCourseDetails(id: string){
    this.isLoaded = true;
    this._courseService.showAdminCourse(id).subscribe((response)=>{
      // @ts-ignore
      this.courseObj = response['course'];
      this.courseCoverForm.controls.courseCover.setValidators([]);
      this.courseObj.chapters.forEach((chapter: any, chapterIndex: number) => {
        chapter.files.forEach((file: any, fileIndex: number) => {
          file.binaryAttachments = [];
        });
      });
      this.courseNameForPreview = this.courseObj['cover'];
      this._courseService.getCourseCover(id, this.courseNameForPreview).subscribe((res) => {
        const file = new File([res], this.courseNameForPreview, {type: 'image/png', lastModified: Date.now()});
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.courseCoverForPreview = reader.result;
            this.courseNameForPreview = file.name;
            this.courseObj['cover'] = file;
        }
        this.cdr.markForCheck();
        this.courseCoverForm.patchValue({courseCover: file});

      }, (error) => {
        this.courseCoverForPreview = error['url'];
      });

      this.courseObj['images'].forEach((img: string) => {
        this.getCourseImage(id, img);
      })
      
      this.isLoaded = false;
    }, (error) => {
      this.isLoaded = false;
    });
  }

  getCourseImage(id: string, imgName: string)
  {
    this._courseService.getCourseImage(id, imgName).subscribe(console.log, (error) => {
      console.log('error', error);
      this.courseImagesForPreview.push(error['url']);
    });
  }

  private handleResError(err: any) {
    this.successOrErrorMsg = err.error.error;
    this.isFormSubmitted = true;
    setTimeout(() => {
      this.hideError();
    }, 3000);
  }
}
