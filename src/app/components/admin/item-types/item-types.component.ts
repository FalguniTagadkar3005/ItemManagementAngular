import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { apiResponse} from '../../../DTO/customObjects';
import { allItemTypesRequest, ItemTypesResponse, allItemTypesResponseWithCount } from '../../../DTO/admin';
import { AdminService } from '../../../services/admin.service';
import { Router, RouterModule } from '@angular/router';
import {  FormBuilder,FormGroup,Validators,ReactiveFormsModule  } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { DeleteDialogComponent } from '../../../DTO/admin/delete-dialog/delete-dialog.component';
import { MatSnackBar,MatSnackBarLabel,MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-item-types',
  standalone: true,
  imports:  [MatFormFieldModule, MatInputModule, MatTableModule,RouterModule,
    MatSortModule,ReactiveFormsModule,MatPaginatorModule,MatDialogModule,MatSnackBarModule],
  templateUrl: './item-types.component.html',
  styleUrl: './item-types.component.css'
})
export class ItemTypesComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'description','itemTypeId'];
  dataSource:MatTableDataSource<ItemTypesResponse>
  defaultSortBy : string = 'name';
  defaultSortOrder : string = 'asc';
  totalRecords:number;
  formBuilder:FormBuilder;
  defaultPageNumber:number=1;
  defaultPageSize:number=5;
  nameFilter:string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchFiltersForm:FormGroup; 

  constructor(private _service:AdminService,private router: Router,private _formBuilder:FormBuilder,
    private dialog:MatDialog,private _snackBar:MatSnackBar) {

    this.searchFiltersForm = this._formBuilder.group({
      name:['',[]],
    })
    this.GetAllItemTypes("",this.defaultPageNumber,this.defaultPageSize);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if(this.dataSource)
    {
      this.dataSource.paginator = this.paginator;
    }
  }

  public GetAllItemTypes(name:string,pageNumber:number,pageSize:number): void {
    let body :allItemTypesRequest= {
      name:name,
      pageNumber:pageNumber,
      pageSize:pageSize,
      sortingOn: this.defaultSortBy,
      sortingWay: this.defaultSortOrder == 'asc' ? 1 : 2
    };
    this._service.getAllItemTypes(body).subscribe((res : apiResponse<allItemTypesResponseWithCount>) => {
      this.dataSource = new MatTableDataSource(res.data.records);
      this.totalRecords = res.data.totalRecords;

    });

  }

  get getName()
  {
    return this.searchFiltersForm.get('name');
  }

  onSubmit()
  {
    this.GetAllItemTypes(this.getName?.value,this.defaultPageNumber,this.defaultPageSize);
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
      this.GetAllItemTypes(this.getName?.value,this.defaultPageNumber,this.defaultPageSize);
    }
  }

  onPageChangeEvent(event:PageEvent)
  {
    this.defaultPageNumber = event.pageIndex+1;
    this.defaultPageSize = event.pageSize;
    this.GetAllItemTypes(this.getName?.value,this.defaultPageNumber,this.defaultPageSize);
  }
  
  onReset()
  {
    this.nameFilter = "";
    this.GetAllItemTypes("",this.defaultPageNumber,this.defaultPageSize);
  }
  
  editItemType(itemTypeId:number)
  {
    this.router.navigate(['/homepage/edit-item-type/'+itemTypeId]);
  }

  deleteItemTypeDialog(itemTypeId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this item type?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteItemType(itemTypeId);
      }
    });
  }

  public DeleteItemType(id:number)
  {
    this._service.deleteItemType(id).subscribe((res:apiResponse<string>)=>{
      this.openSnackBar(res.message,"Ok");
      this.GetAllItemTypes(this.getName?.value,this.defaultPageNumber,this.defaultPageSize);
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });}

  
}
