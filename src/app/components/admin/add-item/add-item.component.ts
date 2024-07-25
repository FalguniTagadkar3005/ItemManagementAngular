import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminService } from '../../../services/admin.service';
import { addItemRequest, itemTypesForDropdown } from '../../../DTO/admin';
import { apiResponse } from '../../../DTO/customObjects';
import { CommonModule } from '@angular/common';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports:  [ReactiveFormsModule,MatInputModule,MatFormFieldModule,CommonModule,MatSnackBarModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  addItemForm:FormGroup; 
  itemTypeList:itemTypesForDropdown[];
  constructor(private _service:AdminService,private _formBuilder:FormBuilder,private snackBar:MatSnackBar,private router:Router,private location:Location) {
    this.addItemForm = this._formBuilder.group({
      name:['',[Validators.required]],
      itemTypeId:['',[Validators.required]],
      description:['',[]],
      quantity:['',Validators.required]
    })

    this.GetAllItemTypes();
  }

  get getControls() {
    return this.addItemForm.controls;
  }

  public AddItem(): void {
    let body :addItemRequest= {
      name:this.getControls['name'].value,
      itemTypeId:parseInt(this.getControls['itemTypeId'].value),
      description:this.getControls['description'].value,
      quantity:this.getControls['quantity'].value,
    };
    this._service.addItem(body).subscribe((res : apiResponse<string>) => {
      this.openSnackBar(res.message,"Ok");
    });
  }

  public GetAllItemTypes()
  {
    this._service.getAllItemTypesForDropdown().subscribe((res:apiResponse<itemTypesForDropdown[]>)=>
    {
      this.itemTypeList = res.data;
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });}

  onSubmit()
  {
    if(this.getControls['name'].valid && this.getControls['itemTypeId'].valid && this.getControls['quantity'].valid)
    {
      this.AddItem();
      this.router.navigate(['/homepage/add-item']);
    }
  }

  onClear()
  {
    this.router.navigate(['/homepage/add-item'])
  }

  onBackClick()
  {
    this.location.back();
  }

}
