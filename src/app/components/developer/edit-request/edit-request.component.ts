import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { apiResponse } from '../../../DTO/customObjects';
import { itemTypesForDropdown } from '../../../DTO/admin';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../DTO/admin/delete-user-dialog/delete-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule,Location } from '@angular/common';
import { addRequest, displayItemForRequest, getRequestByIdResponse, itemsForDropdown, selectedItemForRequest } from '../../../DTO/developer';
import { DeveloperService } from '../../../services/developer.service';

@Component({
  selector: 'app-edit-request',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterModule,
    MatSortModule, ReactiveFormsModule, MatPaginatorModule, MatDialogModule, MatSnackBarModule,CommonModule],
  templateUrl: './edit-request.component.html',
  styleUrl: './edit-request.component.css'
})
export class EditRequestComponent {
  requestDetails:getRequestByIdResponse;
  reqId:number;

  displayedColumns: string[] = ['name', 'itemType','quantity'];
  formBuilder:FormBuilder;
  
  itemTypeList:itemTypesForDropdown[];
  itemList:itemsForDropdown[];
  
  selectedItemListForRequest:selectedItemForRequest[]=[];
  selectedItemListForDisplay:displayItemForRequest[]=[];

  //fields for form
  itemTypeId:number;
  itemId:number;
  quantity:number;
  editRequestForm:FormGroup; 

  @ViewChild(MatTable) table: MatTable<any>;

  dataSource:displayItemForRequest[] = this.selectedItemListForDisplay;

  constructor(private _service:DeveloperService,private router: Router,private _formBuilder:FormBuilder,
              private _snackBar:MatSnackBar,private _activatedRoute:ActivatedRoute,private location:Location) {

    this.editRequestForm = this._formBuilder.group({
      itemTypeId:['',[Validators.required]],
      itemId:['',[Validators.required]],
      quantity:['',[Validators.required]]
    })
    this.GetRequestDetail();
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

  public GetRequestDetail(){
    this._activatedRoute.paramMap.subscribe(res=>
      {
        this.reqId = parseInt(res.get('id')!);
        this._service.getRequest(this.reqId).subscribe((res:apiResponse<getRequestByIdResponse>)=>
        {
          this.requestDetails = res.data;

          for(var item of res.data.items)
          {
            var newItem : selectedItemForRequest ={
              itemId :item.itemId,
              quantity:item.quantity
            }
  
            var newItemToDisplay:displayItemForRequest={
              name:item.name,
              itemType:item.itemType,
              quantity:item.quantity
            }
  
            this.selectedItemListForRequest.push(newItem);
            this.selectedItemListForDisplay.push(newItemToDisplay);
          }
          this.dataSource = this.selectedItemListForDisplay;
          this.table.renderRows();
        })
      })
  }
    
  public EditRequest(request:addRequest)
  {
    this._service.editRequest(this.reqId,request).subscribe((res:apiResponse<string>)=>
    {
      this.openSnackBar(res.message,'OK');
    })
    this.router.navigate(['/homepage/requests']);
  }
  
  onEditClick()
  {
    document.getElementById('editItemForm')?.classList.remove('d-none');
    document.getElementById('editAndCancel')?.classList.add('d-none');
    document.getElementById('saveAndSubmit')?.classList.remove('d-none');
     this.GetAllItemTypes();
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
    return this.editRequestForm.controls;
  }

  isItemIdExists(itemId: number): boolean {
    return this.selectedItemListForRequest.some(item => item.itemId == itemId);
  }

  onChangeItemType(event: Event) {
    this.GetAllItems(parseInt((event.target as HTMLSelectElement).value));
  }

  onAddClick()
  {
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
        this.editRequestForm.reset;
      } else {
        this.openSnackBar("Item already exists","Ok");
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
    this.EditRequest(body);
  }

  onSubmit()
  {
    let body:addRequest = {
      items:this.selectedItemListForRequest,
      submit:true
    }
    this.EditRequest(body);

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
