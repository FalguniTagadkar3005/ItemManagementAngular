import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
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
import { addRequest, displayItemForRequest, getAvailableItemsRequest, getRequestSingleItemResponse, itemsForDropdown, selectedItemForRequest } from '../../../DTO/developer';
import { DeveloperService } from '../../../services/developer.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-return-request',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterModule,
    MatSortModule, ReactiveFormsModule, MatPaginatorModule, MatDialogModule, MatSnackBarModule,CommonModule],
  templateUrl: './add-return-request.component.html',
  styleUrl: './add-return-request.component.css'
})
export class AddReturnRequestComponent {
  displayedColumns: string[] = ['name', 'itemType','quantity'];
  totalRecords:number;
  formBuilder:FormBuilder;
  
  itemTypeList:itemTypesForDropdown[];
  itemList:itemsForDropdown[];
  
  selectedItemListForRequest:selectedItemForRequest[]=[];
  selectedItemListForDisplay:displayItemForRequest[]=[];
  availableItemListForDisplay:displayItemForRequest[] = [];
  itemTypeId:number;
  itemId:number;
  quantity:number;
  addRequestForm:FormGroup; 
  @ViewChild("selectedItemsTable") table: MatTable<any>;
  @ViewChild("availableItemsTable") tableAvailable: MatTable<any>;
  dataSource:displayItemForRequest[] = this.selectedItemListForDisplay;
  dataSourceAvailable:displayItemForRequest[] = this.availableItemListForDisplay;
  constructor(private _service:DeveloperService,private router: Router,private _formBuilder:FormBuilder,
            private _snackBar:MatSnackBar,private authService:AuthService,private location:Location) {

    this.addRequestForm = this._formBuilder.group({
      itemTypeId:['',[Validators.required]],
      itemId:['',[Validators.required]],
      quantity:['',[Validators.required]]
    })
    this.GetAvailableItems();
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

  public AddReturnRequest(request:addRequest)
  {
    this._service.addReturnRequest(request).subscribe((res:apiResponse<string>)=>
    {
      this.openSnackBar(res.message,'Ok');
    })
    this.router.navigate(['/homepage/return-requests']);
  }

  public GetAvailableItems()
  {
    let body:getAvailableItemsRequest={
      name:"",
      pageNumber:1,
      pageSize:10,
      sortingOn:"",
      sortingWay:1
    }
    this._service.getAvailableItems(body).subscribe((res:apiResponse<getRequestSingleItemResponse[]>)=>
    {
        for(var item of res.data)
        {
            var newItem:displayItemForRequest=
            {
              name:item.name,
              itemType:item.itemType,
              quantity:item.quantity
            };
            this.availableItemListForDisplay.push(newItem);
        }
        this.dataSourceAvailable = this.availableItemListForDisplay;
        this.tableAvailable.renderRows();
    })
    
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
        this.dataSource = this.selectedItemListForDisplay.slice();
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

  onSave()
  {
    let body :addRequest={
      items:this.selectedItemListForRequest,
      submit:false
    }
    this.AddReturnRequest(body);
  }

  onSubmit()
  {
    let body:addRequest = {
      items:this.selectedItemListForRequest,
      submit:true
    }
    this.AddReturnRequest(body);

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
