import { Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import { MatInputModule,MatFormField } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import {  apiResponse, resetPasswordRequest } from '../DTO/customObjects';
import { SharedServicesService } from '../shared-services.service';
import { RouterModule,ActivatedRoute} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatCardModule,MatInputModule,MatFormField,
    MatIcon,MatButtonModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  resetPasswordForm:FormGroup;
  service:SharedServicesService;

  userMessage:string;
  errorMessage:string;
  id:string;
  hidePwd:boolean=true;
  hideConfirmPwd:boolean=true;

  constructor(private formBuilder:FormBuilder,private _service:SharedServicesService,private _activatedRoute:ActivatedRoute) {

    this.resetPasswordForm = this.formBuilder.group({
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    })
    this.service = _service;
  }

  get getControls()
  {
    return this.resetPasswordForm.controls;
  }

  clickPwd(event:MouseEvent)
  {
    this.hidePwd=!this.hidePwd;
    event.stopPropagation();
  }

  clickConfirmPwd(event:MouseEvent)
  {
    this.hideConfirmPwd=!this.hideConfirmPwd;
    event.stopPropagation();
  }

  onSubmit()
  {
      this._activatedRoute.paramMap.subscribe(res=>
      {
        this.id = res.get('id')!;
      })

    if(this.getControls['password']!.valid && this.getControls['confirmPassword']!.valid)
    {

      let pwd = this.getControls['password'];
      let confPwd = this.getControls['confirmPassword'];
      if(pwd.value!==confPwd.value)
      {
        this.userMessage="";
        this.errorMessage="Password doesn't match with confirm password";
        return;
      }

      let resetPasswordRequest : resetPasswordRequest = {
        newPassword : this.getControls['password']!.value,
      }
      console.log("id:"+this.id);
      console.log('password:'+resetPasswordRequest.newPassword);
      this.service.resetPassword(this.id,resetPasswordRequest).subscribe((res : apiResponse<string>) => {
          this.errorMessage = "";
          this.userMessage = "Password reset successful!";
      },(error:HttpErrorResponse)=>
      {
          this.userMessage="";
          this.errorMessage="User not found for given token!"
      }
      );
    }
  }

}
