import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminService } from '../../../services/admin.service';
import { editItemRequest, editUserRequest, getItemResponse, itemTypesForDropdown, userResponse } from '../../../DTO/admin';
import { apiResponse } from '../../../DTO/customObjects';
import { CommonModule } from '@angular/common';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports:  [ReactiveFormsModule,MatInputModule,MatFormFieldModule,CommonModule,MatSnackBarModule],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css'
})
export class EditItemComponent {
  editItemForm:FormGroup; 
  itemId:number;
  //to display user data in fields when user lands on the page
  item:getItemResponse;
  itemTypeList:itemTypesForDropdown[];
  name:string;
  itemTypeId:number;
  description:string;

  constructor(private _service:AdminService,private _formBuilder:FormBuilder,private snackBar:MatSnackBar,
    private router:Router,private _activatedRoute:ActivatedRoute) {
    this.editItemForm = this._formBuilder.group({
      name:['',[Validators.required]],
      itemTypeId:['',[Validators.required]],
      description:['',Validators.required]
    })
    this.GetItem();
    this.GetAllItemTypes();
  }

  get getControls() {
    return this.editItemForm.controls;
  }

  public EditItem(): void {
    let body :editItemRequest= {
      name:this.getControls['name'].value,
      itemTypeId:this.getControls['itemTypeId'].value,
      description:this.getControls['description'].value,
    };

    this._service.editItem(this.itemId,body).subscribe((res : apiResponse<string>) => {
      this.openSnackBar(res.message,"Ok");
    });
  }

  public GetItem():void{
    this._activatedRoute.paramMap.subscribe(res=>
      {
        this.itemId = parseInt(res.get('id')!);
        this._service.getItem(this.itemId).subscribe((res:apiResponse<getItemResponse>)=>
        {
          this.item = res.data;
          this.name = this.item.name;
          this.itemTypeId = this.item.itemTypeId;
          this.description = this.item.description;
        })
      })
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
    if(this.getControls['name'].valid && this.getControls['itemTypeId'].valid && this.getControls['description'].valid)
    {
      this.EditItem();
      this.router.navigate(['/homepage/edit-item/'+this.itemId]);
    }
  }

  onClear()
  {
    this.router.navigate(['/homepage/edit-item/'+this.itemId]);
  }
}
