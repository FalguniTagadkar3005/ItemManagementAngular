import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminService } from '../../../services/admin.service';
import { addUserRequest } from '../../../DTO/admin';
import { apiResponse } from '../../../DTO/customObjects';
import { CommonModule } from '@angular/common';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatFormFieldModule,CommonModule,MatSnackBarModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  addUserForm:FormGroup; 

  constructor(private _service:AdminService,private _formBuilder:FormBuilder,private snackBar:MatSnackBar,private router:Router) {
    this.addUserForm = this._formBuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      roleId:['',Validators.required]
    })
  }

  get getControls() {
    return this.addUserForm.controls;
  }

  public AddUser(): void {
    let body :addUserRequest= {
      name:this.getControls['name'].value,
      email:this.getControls['email'].value,
      password:this.getControls['password'].value,
      roleId:this.getControls['roleId'].value,
      roId:15
    };
    this._service.addUser(body).subscribe((res : apiResponse<string>) => {
      this.openSnackBar("User added successfully","Ok");
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });}

  onSubmit()
  {
    if(this.getControls['name'].valid && this.getControls['email'].valid && this.getControls['password'].valid && this.getControls['roleId'].valid)
    {
      this.AddUser();
      this.router.navigate(['/homepage/add-user']);
    }
  }

  onClear()
  {
    this.router.navigate(['/homepage/add-user'])
  }
}
