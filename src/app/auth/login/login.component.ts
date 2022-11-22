import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  isLoggedError: boolean = false;
  constructor(private fB: FormBuilder, private _adminService: AdminService, private _router: Router) { }

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form = this.fB.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submitForm() {
    if(this.form.valid){
      this._adminService.login(this.form.value).subscribe((response: Object)=> {
        this._adminService.saveAdminLoginData(response);
        this._adminService.setLoggedStatus(true);
        this._router.navigateByUrl('');
      }, () => {
        this.isLoggedError = true;
      });
    }
  }
}

/**
 * Credentials
 * {
 *   "email": "bravespirit@gmail.com",
 *   "password": "spV0&kE5$o$t"
 * }
 */