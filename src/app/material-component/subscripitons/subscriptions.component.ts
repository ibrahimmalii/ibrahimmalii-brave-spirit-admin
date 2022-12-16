import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ColumnMenuClickEventArgs, GridComponent, PageSettingsModel, ToolbarItems} from "@syncfusion/ej2-angular-grids";
import {MatDialog} from "@angular/material/dialog";
import {
  AddUserDialogComponent
} from "../../dashboard/dashboard-components/users/add-user-dialog/add-user-dialog.component";
import {SubscriptionService} from "../../services/subscription.service";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  originalSubscriptions: any;
  modifiedSubscriptions: any;
  isLoaded: boolean = false;
  pageSettings: PageSettingsModel = { pageSize: 7 };
  toolbarOptions: ToolbarItems[] = ['Search', 'Print', 'ExcelExport'];
  @ViewChild('gridEleRef') public gridEleRef?: ElementRef;
  @ViewChild('grid')
  public grid!: GridComponent;

  constructor(private _subscriptionService: SubscriptionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllSubscriptions();
  }

  private getAllSubscriptions() {
    this._subscriptionService.getAll().subscribe(res => {
      this.originalSubscriptions = res;
      console.log(res);
      // this.modifiedSubscriptions = structuredClone(this.originalSubscriptions).map((item: any) => {
      //   item['gender'] = item['gender'] === 1 ? 'Female' : 'Male';
      //   return item;
      // });
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

  }

  addNewSubscription() {
    this.openDialog()
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getAllSubscriptions();
    });
  }

  updateUser(id: string) {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('res => ',result)
      this.getAllSubscriptions();
    });
  }

  pdfExportComplete(): void {
    this.grid.hideSpinner();
  }
  excelExportComplete(): void {
    this.grid.hideSpinner();
  }
}
