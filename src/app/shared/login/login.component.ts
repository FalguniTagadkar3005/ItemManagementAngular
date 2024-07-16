import { Component,ViewChild,signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import {  apiResponse, loginRequest } from '../DTO/customObjects';
import { SharedServicesService } from '../shared-services.service';
import { Router,RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatInputModule,MatFormField,
            MatIcon,MatButtonModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[{provide: 'MAT_FORM_FIELD_DEFAULT_OPTIONS', useValue: {appearance: 'outline'}}]
})
export class LoginComponent {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginForm:FormGroup;
  service:SharedServicesService;
  router:Router;
  userNotFound:string;
  constructor(private formBuilder:FormBuilder,private _service:SharedServicesService,private _router:Router) {

    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    })
    this.service = _service;
    this.router = _router;
  }

  get getControls() {
    return this.loginForm.controls;
  }

  get getEmail()
  {
    return this.loginForm.get('email');
  }

  get getPassword()
  {
    return this.loginForm.get('password');
  }

  onSubmit()
  {
    if(this.getEmail!.valid && this.getPassword!.valid)
    {

      let loginRequest : loginRequest = {
        email : this.getControls['email'].value,
        password : this.getControls['password'].value
      }
      
      this.service.login(loginRequest).subscribe((res : apiResponse<string>) => {
          this.router.navigate(['/homepage']);     
      },(error:HttpErrorResponse)=>
      {
        this.userNotFound = "User not found";
      }
      );
    }
  }

}
