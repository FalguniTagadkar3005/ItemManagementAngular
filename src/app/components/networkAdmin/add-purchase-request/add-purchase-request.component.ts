import {  Component, Inject, ViewChild } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { apiResponse } from '../../../DTO/customObjects';
import { itemTypesForDropdown } from '../../../DTO/admin';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule,Location } from '@angular/common';
import { addRequest, displayItemForRequest, itemsForDropdown, selectedItemForRequest } from '../../../DTO/developer';
import { DeveloperService } from '../../../services/developer.service';
import { NetworkAdminService } from '../../../services/network-admin.service';
import { addPurchaseRequest } from '../../../DTO/networkAdmin';

@Component({
  selector: 'app-add-purchase-request',
  standalone: true,
  imports:  [MatFormFieldModule, MatInputModule, MatTableModule, RouterModule,
    MatSortModule, ReactiveFormsModule, MatPaginatorModule, MatDialogModule, MatSnackBarModule,CommonModule],
  templateUrl: './add-purchase-request.component.html',
  styleUrl: './add-purchase-request.component.css'
})
export class AddPurchaseRequestComponent {
  displayedColumns: string[] = ['name', 'itemType','quantity'];
  totalRecords:number;
  formBuilder:FormBuilder;
  
  itemTypeList:itemTypesForDropdown[];
  itemList:itemsForDropdown[];
  
  selectedItemListForRequest:selectedItemForRequest[]=[];
  selectedItemListForDisplay:displayItemForRequest[]=[];

  //form fields
  itemTypeId:number;
  itemId:number;
  quantity:number;

  addRequestForm:FormGroup; 
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource:displayItemForRequest[] = this.selectedItemListForDisplay;
  constructor(private _service:NetworkAdminService,private router: Router,private _formBuilder:FormBuilder,
    private dialog:MatDialog,private _snackBar:MatSnackBar,private location:Location) {

    this.addRequestForm = this._formBuilder.group({
      itemTypeId:['',[Validators.required]],
      itemId:['',[Validators.required]],
      quantity:['',[Validators.required]]
    })
    this.GetAllItemTypes();
  }

  public GetAllItemTypes()
  {
    this._service.getAllItemTypesForDropdown().subscribe((res:apiResponse<itemTypesForDropdown[]>)=>
    {
      this.itemTypeList = res.data;
    })
  }

  public GetAllItems(itemTypeId:number)
  {
    this._service.getAllItemsForDropdown(itemTypeId).subscribe((res:apiResponse<itemsForDropdown[]>)=>
    {
      this.itemList = res.data;
      this.getControls['itemId'].setValue(this.itemList[0].itemId);
    })
  }

  public AddPurchaseRequest(request:addPurchaseRequest)
  {
    this._service.addPurchaseRequest(request).subscribe((res:apiResponse<string>)=>
    {
      this.openSnackBar(res.message,'Ok');
    })
    this.router.navigate(['/homepage/purchase-requests']);
  }

  getItemName(itemId:number)
  {
    const item = this.itemList.find(item => item.itemId == itemId);
    return item ? item.name : '';
  }

  getItemTypeName(itemTypeId:number)
  {
    const itemType = this.itemTypeList.find(itemType => itemType.itemTypeId == itemTypeId);
    return itemType? itemType.name:'';
  }

  get getControls()
  {
    return this.addRequestForm.controls;
  }

  isItemIdExists(itemId: number): boolean {
    return this.selectedItemListForRequest.some(item => item.itemId == itemId);
  }

  onChangeItemType(event: Event) {
    this.GetAllItems(parseInt((event.target as HTMLSelectElement).value));
  }

  onAdd()
  {
    debugger;
    if(this.getControls['itemTypeId'].valid && this.getControls['itemId'].valid && this.getControls['quantity'].valid)
    {
      const newItem: selectedItemForRequest = {
        itemId: this.getControls['itemId'].value,
        quantity: this.getControls['quantity'].value
      };

      const newItemToDisplay:displayItemForRequest={
        name:this.getItemName(this.getControls['itemId'].value),
        itemType:this.getItemTypeName(this.getControls['itemTypeId'].value),
        quantity:this.getControls['quantity'].value
      }

      if (!this.isItemIdExists(newItem.itemId)) {
        this.selectedItemListForRequest.push(newItem);
        this.selectedItemListForDisplay.push(newItemToDisplay);
        this.dataSource = this.selectedItemListForDisplay;
        this.table.renderRows();
        this.addRequestForm.reset;
      } else {
        // Handle case where itemId already exists (e.g., show error message)
        console.log('Item ID already exists in the list.');
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });}

  onSubmit()
  {
    let body:addPurchaseRequest = {
      items:this.selectedItemListForRequest,
    }
    this.AddPurchaseRequest(body);

  }

  onClear()
  {
    this.selectedItemListForDisplay = [];
    this.selectedItemListForRequest = [];
    this.dataSource = this.selectedItemListForDisplay;
    this.table.renderRows();
  }

  onBackClick()
  {
    this.location.back();
  }
}
