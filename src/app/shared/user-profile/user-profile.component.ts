import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import { MatInputModule } from '@angular/material/input';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedServicesService } from '../shared-services.service';
import { Router,RouterLink } from '@angular/router';
import { userDetail,apiResponse } from '../../DTO/customObjects';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule,MatInputModule,ReactiveFormsModule,CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userDataForm:FormGroup;
  service:SharedServicesService;
  router:Router;
  formBuilder:FormBuilder;
  jwtToken:string;
  @Input() user:userDetail
  constructor(private _formBuilder:FormBuilder,private _service:SharedServicesService,private _router:Router,private _cookieService:CookieService) {
      
    this.userDataForm = this._formBuilder.group({
      name:['',[Validators.required,Validators.pattern('[a-zA-z\s]{5,}')]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      roleId:['',[Validators.required]],
      ro:['',[Validators.required]]
    })

    this.jwtToken = _cookieService.get('Jwt');
    this.service = _service;
    this.router = _router;
    this.service.getUser(this.jwtToken).subscribe((res : apiResponse<userDetail>) => {
      this.user = res.data;
    },(error:HttpErrorResponse)=>
    {
      console.log('user not found');
    }
    );
  }

  get getControls() {
    return this.userDataForm.controls;
  }

  onSubmit()
  {

  }

}
