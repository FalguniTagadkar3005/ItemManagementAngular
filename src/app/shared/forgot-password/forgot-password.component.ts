import { Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import {  apiResponse, forgotPasswordRequest } from '../../DTO/customObjects';
import { SharedServicesService } from '../shared-services.service';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatCardModule,MatInputModule,MatFormField,
    MatIcon,MatButtonModule,ReactiveFormsModule,CommonModule,RouterModule ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  res:apiResponse<string>;
  forgotPasswordForm:FormGroup;
  service:SharedServicesService;
  userMessage:string;
  errorMessage:string;
  constructor(private formBuilder:FormBuilder,private _service:SharedServicesService) {

    this.forgotPasswordForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
    })
    this.service = _service;
  }



  get getEmail()
  {
    return this.forgotPasswordForm.get('email');
  }



  onSubmit()
  {
    if(this.getEmail!.valid)
    {

      let forgotPasswordRequest : forgotPasswordRequest = {
        email : this.getEmail!.value,
      }
      
      this.service.forgotPassword(forgotPasswordRequest).subscribe((res : apiResponse<string>) => {
        this.errorMessage="";
        this.userMessage="Password reset link has been sent";
      },
      (error:HttpErrorResponse)=>
      {
        this.userMessage="";
        this.errorMessage="User not found!"
      }
      );
    }
  }
}
