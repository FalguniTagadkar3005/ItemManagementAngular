import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminService } from '../../../services/admin.service';
import { addOrEditItemTypeRequest } from '../../../DTO/admin';
import { apiResponse } from '../../../DTO/customObjects';
import { CommonModule,Location } from '@angular/common';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-item-types',
  standalone: true,
  imports:  [ReactiveFormsModule,MatInputModule,MatFormFieldModule,CommonModule,MatSnackBarModule],
  templateUrl: './add-item-type.component.html',
  styleUrl: './add-item-type.component.css'
})
export class AddItemTypesComponent {
  addItemTypeForm:FormGroup; 

  constructor(private _service:AdminService,private _formBuilder:FormBuilder,private snackBar:MatSnackBar,private router:Router,private location:Location) {
    this.addItemTypeForm = this._formBuilder.group({
      name:['',[Validators.required]],
      description:['',[]],
    })
  }

  get getControls() {
    return this.addItemTypeForm.controls;
  }

  public AddItemType(): void {
    let body :addOrEditItemTypeRequest= {
      name:this.getControls['name'].value,
      description:this.getControls['description'].value
    };
    this._service.addItemType(body).subscribe((res : apiResponse<string>) => {
      this.openSnackBar(res.message,"Ok");
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });}

  onSubmit()
  {
    if(this.getControls['name'].valid)
    {
      this.AddItemType();
      this.router.navigate(['/homepage/add-item-type']);
    }
  }

  onClear()
  {
    this.router.navigate(['/homepage/add-item-type'])
  }
  onBackClick()
  {
    this.location.back();
  }

}
