import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminService } from '../../../services/admin.service';
import { editUserRequest, userResponse } from '../../../DTO/admin';
import { apiResponse } from '../../../DTO/customObjects';
import { CommonModule,Location } from '@angular/common';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatFormFieldModule,CommonModule,MatSnackBarModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  editUserForm:FormGroup; 
  userId:number;
  //to display user data in fields when user lands on the page
  user:userResponse;
  name:string;
  email:string;
  roleId:number;

  constructor(private _service:AdminService,private _formBuilder:FormBuilder,private snackBar:MatSnackBar,
    private router:Router,private _activatedRoute:ActivatedRoute,private location:Location) {
    this.editUserForm = this._formBuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      roleId:['',Validators.required]
    })
    this.GetUser();
  }

  get getControls() {
    return this.editUserForm.controls;
  }

  public EditUser(): void {
    let body :editUserRequest= {
      name:this.getControls['name'].value,
      email:this.getControls['email'].value,
      roleId:this.getControls['roleId'].value,
      roId:15
    };
    debugger
    this._service.editUser(this.userId,body).subscribe((res : apiResponse<string>) => {
      this.openSnackBar(res.message,"Ok");
    });
  }

  public GetUser():void{
    this._activatedRoute.paramMap.subscribe(res=>
      {
        this.userId = parseInt(res.get('id')!);
        this._service.getUser(this.userId).subscribe((res:apiResponse<userResponse>)=>
        {
          this.user = res.data;
          this.name = this.user.name;
          this.email = this.user.email;
          this.roleId = this.user.roleId;
          console.log(this.user);
        })
      })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });}

  onSubmit()
  {
    if(this.getControls['name'].valid && this.getControls['email'].valid && this.getControls['roleId'].valid)
    {
      this.EditUser();
      this.router.navigate(['/homepage/edit-user/'+this.userId]);
    }
  }

  onClear()
  {
    this.router.navigate(['/homepage/edit-user/'+this.userId]);
  }
  onBackClick()
  {
    this.location.back();
  }

}
