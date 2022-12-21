import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ColumnMenuClickEventArgs, GridComponent, PageSettingsModel, ToolbarItems} from "@syncfusion/ej2-angular-grids";
import {SubscriptionService} from "../../services/subscription.service";
import {environment} from "../../../environments/environment";
import {DetailsComponent} from "./details/details.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  originalRequests: any;
  modifiedRequests: any;
  isLoaded: boolean = false;
  pageSettings: PageSettingsModel = { pageSize: 7 };
  toolbarOptions: ToolbarItems[] = ['Search', 'Print', 'ExcelExport'];
  @ViewChild('gridEleRef') public gridEleRef?: ElementRef;
  @ViewChild('grid')
  public grid!: GridComponent;
  proofLink: string = environment.baseUrl + '/subscriptions/proof/';

  constructor(private _subscriptionService: SubscriptionService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllRequests();
  }

  private getAllRequests() {
    this._subscriptionService.getRequests().subscribe(res => {
      this.originalRequests = res;
      console.log(res);
      this.modifiedRequests = structuredClone(this.originalRequests);
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

  pdfExportComplete(): void {
    this.grid.hideSpinner();
  }
  excelExportComplete(): void {
    this.grid.hideSpinner();
  }

  getAttachmentFile(id: string){
    this._subscriptionService.getProofFile(id).subscribe(console.log, console.error);
  }

  approveRequest(id: string) {
    if(confirm('Are you sure you want to approve?')) {
      this._subscriptionService.approve(id).subscribe((res) => {
        this.getAllRequests();
      }, console.error);
    }
  }

  declineRequest(id: string) {
    if(confirm('Are you sure you want to decline?')) {
      this._subscriptionService.decline(id).subscribe((res) => {
        this.getAllRequests();
      }, console.error);
    }
  }

  showDetails(id: string) {
    // TODO from here tomorrow.
    this.openDialog(id);
  }

  openDialog(id:string) {
    const dialogRef = this.dialog.open(DetailsComponent, {
      data: {id},
      width: '1200px'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
