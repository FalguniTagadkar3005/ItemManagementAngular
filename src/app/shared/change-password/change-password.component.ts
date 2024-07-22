import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import { MatInputModule } from '@angular/material/input';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedServicesService } from '../shared-services.service';
import { Router,RouterLink } from '@angular/router';
import { userDetail,apiResponse, changePassword } from '../../DTO/customObjects';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [MatCardModule,MatInputModule,ReactiveFormsModule,CommonModule,MatIcon],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changePasswordForm:FormGroup;
  service:SharedServicesService;
  router:Router;
  formBuilder:FormBuilder;
  hideOldPwd:boolean=true;
  hidePwd:boolean=true;
  hideConfirmPwd:boolean=true;
  userMessage:string;
  errorMessage:string;
  id:number;
  constructor(private _formBuilder:FormBuilder,private _service:SharedServicesService,private _router:Router,private _cookieService:CookieService) {
    this.changePasswordForm = this._formBuilder.group({
      oldPassword:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      newPassword:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      cnfNewPassword:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    })

    this.service = _service;
    this.router = _router;
    this.id = parseInt(_cookieService.get('userId'));
  }

  
  get getControls() {
    return this.changePasswordForm.controls;
  }

  clickOldPwd(event:MouseEvent)
  {
    this.hideOldPwd=!this.hideOldPwd;
    event.stopPropagation();
  }
  clickPwd(event:MouseEvent)
  {
    this.hidePwd=!this.hidePwd;
    event.stopPropagation();
  }
  clickCnfPwd(event:MouseEvent)
  {
    this.hideConfirmPwd=!this.hideConfirmPwd;
    event.stopPropagation();
  }
  onSubmit()
  {
    if(this.getControls['newPassword']!.valid && this.getControls['oldPassword']!.valid && this.getControls['cnfNewPassword']!.valid)
    {

      let changePwdRequest : changePassword = {
        oldPassword: this.getControls['oldPassword'].value,
        password : this.getControls['newPassword'].value,
        confirmPassword : this.getControls['cnfNewPassword'].value,
      }
      
      this.service.changePassword(this.id,changePwdRequest).subscribe((res : apiResponse<string>) => {
        if(!res.isSuccess)
        {
          this.errorMessage = res.message;
          this.userMessage = "";
          return;
        }
        else
        {
          this.userMessage = res.message;
          this.errorMessage = "";
        }
      });

      
    }
  }
}
