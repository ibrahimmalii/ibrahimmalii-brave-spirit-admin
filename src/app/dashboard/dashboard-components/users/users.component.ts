import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ColumnMenuClickEventArgs, GridComponent, PageSettingsModel, ToolbarItems} from '@syncfusion/ej2-angular-grids';
import {MatDialog} from "@angular/material/dialog";
import {AddUserDialogComponent} from "./add-user-dialog/add-user-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  originalUsers: any;
  modifiedUsers: any;
  isLoaded: boolean = false;
  pageSettings: PageSettingsModel = { pageSize: 7 };
  toolbarOptions: ToolbarItems[] = ['Search', 'Print', 'ExcelExport'];
  @ViewChild('gridEleRef') public gridEleRef?: ElementRef;
  @ViewChild('grid')
  public grid!: GridComponent;

  constructor(private _userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUsers(10);
    this.getAllUsers();
  }

  private getAllUsers(size: number = 10000000, page: number = 1) {
    this._userService.getAll(size, page).subscribe(res => {
      this.originalUsers = res;
      this.modifiedUsers = structuredClone(this.originalUsers).map((item: any) => {
        item['gender'] = item['gender'] === 1 ? 'Female' : 'Male';
        return item;
      });
    }, (err) => {
      console.error(err);
      this.isLoaded = true;
    }, () => {
      this.isLoaded = true;
    });
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

  getActivationStatues(id: string) {
    this._userService.enableAndDisableUser(id).subscribe((res) => {
      this.getAllUsers();
    }, console.error);
  }

  addNewUser() {
    this.openDialog()
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
    });
  }

  updateUser(id: string) {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('res => ',result)
      this.getAllUsers();
    });
  }

  pdfExportComplete(): void {
    this.grid.hideSpinner();
  }
  excelExportComplete(): void {
    this.grid.hideSpinner();
  }
}
