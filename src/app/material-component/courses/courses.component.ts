import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ColumnMenuClickEventArgs, GridComponent, PageSettingsModel, ToolbarItems} from '@syncfusion/ej2-angular-grids';
import {MatDialog} from "@angular/material/dialog";
import {CourseService} from "../../services/course.service";
import {
  AddUserDialogComponent
} from "../../dashboard/dashboard-components/users/add-user-dialog/add-user-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private _courseService: CourseService, private _router: Router) { }

  originalCourses: any;
  modifiedCourses: any;
  isLoaded: boolean = false;
  pageSettings: PageSettingsModel = { pageSize: 7 };
  toolbarOptions: ToolbarItems[] = ['Search', 'Print', 'ExcelExport'];
  @ViewChild('gridEleRef') public gridEleRef?: ElementRef;
  @ViewChild('grid')
  public grid!: GridComponent;

  ngOnInit(): void {
    this.getCourses();
  }

  toolbarClick(args: ColumnMenuClickEventArgs): void {
    if(this.grid){
      if (args.item.id === 'Grid_pdfexport') { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
        this.grid.showSpinner();
        this.grid.pdfExport();
      }
      if (args.item.id === 'Grid_excelexport') {
        this.grid.showSpinner();
        console.log(this.grid);
        // this.grid.excelExport().then(console.log);
      }
    }
  }

  getCourses()
  {
    this._courseService.getAllForAdmin().subscribe(res => {
      this.originalCourses = res;
      this.modifiedCourses = structuredClone(this.originalCourses);
    }, (err) => {
      console.error(err);
      this.isLoaded = true;
    }, () => {
      this.isLoaded = true;
    });
  }

  addNewCourse() {
    this._router.navigateByUrl('/add-new-course');
  }

  updateCourse(courseId: string) {
    this._router.navigateByUrl(`/update-course/${courseId}`)
  }

  changePublishStatus(id: string) {
    this._courseService.changePublishStatus(id).subscribe(console.log, console.error);
  }

    deleteCourse(courseId: any) {
      if(confirm('Are you sure?')) {
        this._courseService.deleteCourse(courseId).subscribe((res) => {
          this.getCourses();
        }, console.error);
      }
    }

    changePaidOrFreeStatus(id: string) {
      this._courseService.changePaidStatus(id).subscribe(console.log, console.error);
    }
}
