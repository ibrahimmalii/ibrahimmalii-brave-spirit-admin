import {Component, Inject, OnInit} from '@angular/core';
import {
  AddUserDialogComponent
} from "../../../dashboard/dashboard-components/users/add-user-dialog/add-user-dialog.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SubscriptionService} from "../../../services/subscription.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  isLoaded: boolean = false;
  course: any;
  user: any;

  constructor(
      private _subscriptionService: SubscriptionService,
      private dialogRef: MatDialogRef<DetailsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  subscription: any;
  proofLink: string = environment.baseUrl + '/subscriptions/proof/';

  ngOnInit(): void {
    if(this.data.id) {
      this._subscriptionService.showDetails(this.data.id).subscribe((res) => {
        this.subscription = res;
        // @ts-ignore
        this.course = res['course'];
        // @ts-ignore
        this.user = res['user'];
        this.isLoaded = true;
      }, console.error);
    }
  }



}
