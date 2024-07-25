import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminService } from '../../../services/admin.service';
import { addOrEditItemTypeRequest, itemTypeResponse, editUserRequest, userResponse } from '../../../DTO/admin';
import { apiResponse } from '../../../DTO/customObjects';
import { CommonModule,Location } from '@angular/common';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-item-type',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatFormFieldModule,CommonModule,MatSnackBarModule],
  templateUrl: './edit-item-type.component.html',
  styleUrl: './edit-item-type.component.css'
})
export class EditItemTypeComponent {
  editItemTypeForm:FormGroup; 
  itemType:itemTypeResponse;
  
  itemTypeId:number;
  name:string;
  description:string;

  constructor(private _service:AdminService,private _formBuilder:FormBuilder,private snackBar:MatSnackBar,
    private router:Router,private _activatedRoute:ActivatedRoute,private location:Location) {
    this.editItemTypeForm = this._formBuilder.group({
      name:['',[Validators.required]],
      description:['',[]],
    })
    this.GetItemType();
  }

  get getControls() {
    return this.editItemTypeForm.controls;
  }

  public EditItemType(): void {
    let body :addOrEditItemTypeRequest= {
      name:this.getControls['name'].value,
      description:this.getControls['description'].value
    };
    this._service.editItemType(this.itemTypeId,body).subscribe((res : apiResponse<string>) => {
      this.openSnackBar(res.message,"Ok");
    });
  }

  public GetItemType():void{
    this._activatedRoute.paramMap.subscribe(res=>
      {
        this.itemTypeId = parseInt(res.get('id')!);
        this._service.getItemType(this.itemTypeId).subscribe((res:apiResponse<itemTypeResponse>)=>
        {
          this.itemType = res.data;
          this.name = this.itemType.name;
          this.description = this.itemType.description;
        })
      })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });}

  onSubmit()
  {
    if(this.getControls['name'].valid)
    {
      this.EditItemType();
      this.router.navigate(['/homepage/edit-item-type/'+this.itemTypeId]);
    }
  }

  onClear()
  {
    this.router.navigate(['/homepage/edit-item-type/'+this.itemTypeId])
  }

  onBackClick()
  {
    this.location.back();
  }

}
