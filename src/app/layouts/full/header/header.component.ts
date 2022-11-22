import { Component } from '@angular/core';
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
    constructor(private _adminService: AdminService) {
    }
    logout() {
        this._adminService.logout();
    }
}
