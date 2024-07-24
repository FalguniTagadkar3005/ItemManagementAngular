import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { apiResponse } from '../../../DTO/customObjects';
import { itemResponse, allItemsRequest, allItemsResponseWithCount, itemTypesForDropdown } from '../../../DTO/admin';
import { AdminService } from '../../../services/admin.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent} from '../../../DTO/admin/delete-dialog/delete-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterModule,
    MatSortModule, ReactiveFormsModule, MatPaginatorModule, MatDialogModule, MatSnackBarModule,CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements AfterViewInit{
  displayedColumns: string[] = ['name', 'itemType','description','quantity','itemId'];
  dataSource:MatTableDataSource<itemResponse>
  defaultSortBy : string = 'name';
  defaultSortOrder : string = 'asc';
  totalRecords:number;
  formBuilder:FormBuilder;
  defaultPageNumber:number=1;
  defaultPageSize:number=5;
  itemTypeList:itemTypesForDropdown[];
  nameFilter:string;
  itemTypeIdFilter:number;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchFiltersForm:FormGroup; 

  constructor(private _service:AdminService,private router: Router,private _formBuilder:FormBuilder,
    private dialog:MatDialog,private _snackBar:MatSnackBar) {

    this.searchFiltersForm = this._formBuilder.group({
      name:['',[]],
      itemTypeId:['',[]]
    })
    this.GetAllItems(this.getControls['name']?.value, this.getControls['itemTypeId']?.value == "" ? 0 : this.getControls['itemTypeId']?.value, this.defaultPageNumber, this.defaultPageSize);
    this.GetAllItemTypes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if(this.dataSource)
    {
      this.dataSource.paginator = this.paginator;
    }
  }

  public GetAllItems(name: string, itemTypeId: number, pageNumber: number, pageSize: number): void {
    let body: allItemsRequest = {
      name: name,
      itemTypeId: itemTypeId,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortingOn: this.defaultSortBy,
      sortingWay: this.defaultSortOrder == 'asc' ? 1 : 2
    };
    this._service.getAllItems(body).subscribe((res: apiResponse<allItemsResponseWithCount>) => {
        this.dataSource = new MatTableDataSource(res.data.records);
        this.totalRecords = res.data.totalRecords;
      });
  }

  public GetAllItemTypes()
  {
    this._service.getAllItemTypesForDropdown().subscribe((res:apiResponse<itemTypesForDropdown[]>)=>
    {
      this.itemTypeList = res.data;
    })
  }

  get getControls()
  {
    return this.searchFiltersForm.controls;
  }

  onSubmit()
  {
    this.defaultPageNumber = 1;
    this.defaultPageSize=5;
    this.GetAllItems(this.getControls['name']?.value, this.getControls['itemTypeId']?.value == "" ? 0 : this.getControls['itemTypeId']?.value, this.defaultPageNumber, this.defaultPageSize);
  }

  public addItemType(){
    this.router.navigate(['/homepage/add-item-type']);
  }

  announceSortChange(sortState: Sort) {
    console.log(sortState.active+" "+sortState.direction);
    if(sortState.direction)
    {
      this.defaultSortBy=sortState.active;
      this.defaultSortOrder = sortState.direction;
      this.GetAllItems(this.getControls['name']?.value, this.getControls['itemTypeId']?.value == "" ? 0 : this.getControls['itemTypeId']?.value, this.defaultPageNumber, this.defaultPageSize);
    }
  }

  onPageChangeEvent(event:PageEvent)
  {
    this.defaultPageNumber = event.pageIndex+1;
    this.defaultPageSize = event.pageSize;
    this.GetAllItems(this.getControls['name']?.value, this.getControls['itemTypeId']?.value == "" ? 0 : this.getControls['itemTypeId']?.value, this.defaultPageNumber, this.defaultPageSize);
  }
  
  onReset()
  {
    this.nameFilter = "";
    this.itemTypeIdFilter=0;
    this.defaultPageNumber = 1;
    this.defaultPageSize = 5;
    this.GetAllItems(this.getControls['name']?.value, this.getControls['itemTypeId']?.value == "" ? 0 : this.getControls['itemTypeId']?.value, this.defaultPageNumber, this.defaultPageSize);
  }
  
  editItem(itemId:number)
  {
    this.router.navigate(['/homepage/edit-item/'+itemId]);
  }

  addItem()
  {
    this.router.navigate(['/homepage/add-item']);
  }

  deleteItemDialog(itemId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this item?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteItem(itemId);
      }
    });
  }

  public DeleteItem(id:number)
  {
    this._service.deleteItem(id).subscribe((res:apiResponse<string>)=>{
      this.openSnackBar(res.message,"Ok");
      this.GetAllItems(this.getControls['name']?.value, this.getControls['itemTypeId']?.value == "" ? 0 : this.getControls['itemTypeId']?.value, this.defaultPageNumber, this.defaultPageSize);
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });}

}
