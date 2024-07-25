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
import { DeleteDialogComponent } from '../../../DTO/admin/delete-user-dialog/delete-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { developerRequestSingleResponse, getAllDeveloperRequest, getAllDeveloperRequestResponse } from '../../../DTO/networkAdmin';
import { NetworkAdminService } from '../../../services/network-admin.service';

@Component({
  selector: 'app-developer-requests',
  standalone: true,
  imports:[MatFormFieldModule, MatInputModule, MatTableModule, RouterModule,
    MatSortModule, ReactiveFormsModule, MatPaginatorModule, MatDialogModule, MatSnackBarModule,CommonModule],
  templateUrl: './developer-requests.component.html',
  styleUrl: './developer-requests.component.css'
})
export class DeveloperRequestsComponent {
  displayedColumns: string[] = ['createdDate', 'requestType','status','requestNumber','requestorName','requestId'];
  dataSource:MatTableDataSource<developerRequestSingleResponse>
  defaultSortBy : string = 'date';
  defaultSortOrder : string = 'asc';
  totalRecords:number;
  formBuilder:FormBuilder;

  defaultPageNumber:number=1;
  defaultPageSize:number=5;
  requestNumberOrRequestorFilter:string;
  statusIdFilter:number;
  requestTypeFilter:number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchFiltersForm: FormGroup;

  constructor(private _service: NetworkAdminService, private router: Router, private _formBuilder: FormBuilder, private dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.searchFiltersForm = this._formBuilder.group({
      requestNumberOrRequestor: ['', []],
      statusId: ['', []],
      requestType:['',[]]
    })
    this.GetAllRequest("", 0,0, this.defaultPageNumber, this.defaultPageSize);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  public GetAllRequest(nameOrNumber:string , statusId: number,reqType:number, pageNumber: number, pageSize: number): void {
    let body: getAllDeveloperRequest = {
      requestNumberOrRequestor: nameOrNumber,
      statusId: statusId,
      requestType:reqType,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortingOn: this.defaultSortBy,
      sortingWay: this.defaultSortOrder == 'asc' ? 1 : 2
    };
    this._service.getAllDeveloperRequest(body).subscribe((res: apiResponse<getAllDeveloperRequestResponse>) => {
        this.dataSource = new MatTableDataSource(res.data.records);
        this.totalRecords = res.data.totalRecords;
      });
  }

  get getControls() {
    return this.searchFiltersForm.controls;
  }

  onSubmit() {
    this.defaultPageNumber = 1;
    this.defaultPageSize=5;
    this.GetAllRequest(this.getControls['requestNumberOrRequestor']?.value, this.getControls['statusId']?.value == "" ? 0 : this.getControls['statusId']?.value, this.getControls['requestType']?.value == "" ? 0 : this.getControls['requestType']?.value, this.defaultPageNumber, this.defaultPageSize);
  }

  announceSortChange(sortState: Sort) {
    console.log(sortState.active + " " + sortState.direction);
    if (sortState.direction) {
      this.defaultSortBy = sortState.active;
      this.defaultSortOrder = sortState.direction;
      this.GetAllRequest(this.getControls['requestNumberOrRequestor']?.value, this.getControls['statusId']?.value == "" ? 0 : this.getControls['statusId']?.value, this.getControls['requestType']?.value == "" ? 0 : this.getControls['requestType']?.value, this.defaultPageNumber, this.defaultPageSize);
    }
  }
  

  onPageChangeEvent(event: PageEvent) {
    this.defaultPageNumber = event.pageIndex+1;
    this.defaultPageSize = event.pageSize;
    this.GetAllRequest(this.getControls['requestNumberOrRequestor']?.value, this.getControls['statusId']?.value == "" ? 0 : this.getControls['statusId']?.value, this.getControls['requestType']?.value == "" ? 0 : this.getControls['requestType']?.value, this.defaultPageNumber, this.defaultPageSize);
  }

  onReset() {
    this.requestNumberOrRequestorFilter = "";
    this.statusIdFilter = 0;
    this.requestTypeFilter = 0;
    this.defaultPageNumber = 1;
    this.defaultPageSize = 5;
    this.GetAllRequest("", 0,0, this.defaultPageNumber, this.defaultPageSize);
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });
  }


}
