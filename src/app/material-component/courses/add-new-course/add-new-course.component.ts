import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Course} from "../../../models/course";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chapter} from "../../../models/chapter";
import {PopupSettingsModel} from "@syncfusion/ej2-inplace-editor/src/inplace-editor/base/models-model";
import {TextBoxModel} from "@syncfusion/ej2-inputs";

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.css']
})
export class AddNewCourseComponent implements OnInit {

  originalChapter: Chapter = new Chapter({ar: '', en: ''}, {ar: '', en: ''}, [{title: {ar: '', en: ''}, link: '', file: '', attachments: [], attachmentsName: []}]);
  courseObj: Course = new Course(
      {ar: '', en: ''},
      {ar: '', en: ''},
      {ar: '', en: ''},
      '',
      [],
      {euro: 0, dzd: 0},
      0,
      [new Chapter({ar: '', en: ''}, {ar: '', en: ''}, [{title: {ar: '', en: ''}, link: '', file: '', attachments: [], attachmentsName: []}])],
      false
  );

  public settings: PopupSettingsModel = {
    title: 'Enter title'
  };

  isLinearvarient = true;
  courseNameForm: FormGroup=Object.create(null);
  courseDescriptionForm: FormGroup=Object.create(null);
  courseZippedDescriptionForm: FormGroup=Object.create(null);
  courseCoverForm: FormGroup=Object.create(null);
  coursePriceForm: FormGroup=Object.create(null);

  isUpdate: Boolean = false;

  // About form
  myForm: FormGroup = new FormGroup<any>({});

  get f(){
    return this.myForm.controls;
  }

  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = (event:any) => {
          this.courseObj.images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onFileChangeOnChapterAttachments(event:any, chapterIndex: number, fileIndex: number) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      console.log('filesAmount', filesAmount);
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = (subEvent:any) => {
          console.log('subEvent', event.target.files[i]);
          this.courseObj.chapters[chapterIndex].files[fileIndex].attachments.push(subEvent.target.result);
          this.courseObj.chapters[chapterIndex].files[fileIndex].attachmentsName.push(event.target.files[i].name);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  deleteCourseImage(index: number) {
    this.courseObj.images.splice(index, 1);
  }


  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
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

  changeImage(event:any,  isChapter: boolean = false, chapterIndex:number = 0, fileIndex: number = 0) {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        if(!isChapter) {
          this.courseObj['cover'] = reader.result;
        } else {
          if (typeof reader.result === "string") {
            this.courseObj['chapters'][chapterIndex]['files'][fileIndex]['file'] = reader.result;
          }
        }
      }
      this.cdr.markForCheck();
    }
  }

  log() {
    console.log(this.courseObj);
  }

  submit() {

  }


  changeCoursePublishStatus() {
    this.courseObj['published'] = !this.courseObj['published'];
  }

  addNewCourse() {

  }

  submitChapter() {

  }

  step = 0;
  fileStep = 0;

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
    this.courseObj.chapters[chapterIndex].files[fileIndex].attachmentsName.splice(attachmentIndex, 1);
  }

  deleteFileFromFilesArray(chapterIndex: number, fileIndex: number) {
    this.courseObj.chapters[chapterIndex].files.splice(fileIndex, 1);
  }

  addFileToFilesArray(chapterIndex: number) {
    this.courseObj.chapters[chapterIndex].files.push({title: {ar: '', en: ''}, link: '', file: '', attachments: [], attachmentsName: []});
  }
}
