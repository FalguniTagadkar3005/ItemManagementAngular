import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { apiResponse } from '../../../DTO/customObjects';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarLabel, MatSnackBarModule } from '@angular/material/snack-bar';
import { allRequestWithCount, allrequestRequest, request } from '../../../DTO/developer';
import { DeveloperService } from '../../../services/developer.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from '../../../DTO/admin/delete-user-dialog/delete-dialog.component';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports:[MatFormFieldModule, MatInputModule, MatTableModule, RouterModule,
    MatSortModule, ReactiveFormsModule, MatPaginatorModule, MatDialogModule, MatSnackBarModule,DatePipe,CommonModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent implements AfterViewInit{
  displayedColumns: string[] = ['date', 'status', 'requestNumber', 'requestId'];
  dataSource: MatTableDataSource<request>
  defaultSortBy: string = 'date';
  defaultSortOrder: string = 'asc';
  formBuilder: FormBuilder;
  totalItems: number;
  defaultPageNumber:number=1;
  defaultPageSize:number=5;
  statusIdFilter:number;
  requestNumberFilter:string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchFiltersForm: FormGroup;

  constructor(private _service: DeveloperService, private router: Router, private _formBuilder: FormBuilder, private dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.searchFiltersForm = this._formBuilder.group({
      statusId: ['', []],
      requestNumber:['',[]]
    })
    this.GetAllRequests("", 0, this.defaultPageNumber, this.defaultPageSize);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  public GetAllRequests(requestNumber: string, statusId: number, pageNumber: number, pageSize: number): void {
    let body: allrequestRequest = {
      requestNumber: requestNumber,
      statusId: statusId,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortingOn: this.defaultSortBy,
      sortingWay: this.defaultSortOrder == 'asc' ? 1 : 2
    };
    this._service.getAllRequests(body).subscribe((res: apiResponse<allRequestWithCount>) => {
        this.dataSource = new MatTableDataSource(res.data.records);
        this.totalItems = res.data.totalRecords;
      });
  }

  get getControls() {
    return this.searchFiltersForm.controls;
  }

  onSubmit() {
    this.defaultPageNumber = 1;
    this.defaultPageSize=5;
    this.GetAllRequests(this.getControls['requestNumber']?.value, this.getControls['statusId']?.value == "" ? 0 : this.getControls['statusId']?.value, this.defaultPageNumber, this.defaultPageSize);
  }

  public addRequest() {
    this.router.navigate(['/homepage/add-request']);
  }


  announceSortChange(sortState: Sort) {
    console.log(sortState.active + " " + sortState.direction);
    if (sortState.direction) {
      this.defaultSortBy = sortState.active;
      this.defaultSortOrder = sortState.direction;
      this.GetAllRequests(this.getControls['requestNumber']?.value, this.getControls['statusId']?.value == "" ? 0 : this.getControls['statusId']?.value, this.defaultPageNumber, this.defaultPageSize);
    }
  }

  onPageChangeEvent(event: PageEvent) {
    this.defaultPageNumber = event.pageIndex+1;
    this.defaultPageSize = event.pageSize;
    this.GetAllRequests(this.getControls['requestNumber']?.value, this.getControls['statusId']?.value == "" ? 0 : this.getControls['statusId']?.value, this.defaultPageNumber, this.defaultPageSize);
  }

  onReset() {
    this.requestNumberFilter = "";
    this.statusIdFilter = 0;
    this.defaultPageNumber = 1;
    this.defaultPageSize = 5;
    this.GetAllRequests(this.getControls['requestNumber']?.value, this.getControls['statusId']?.value == "" ? 0 : this.getControls['statusId']?.value, this.defaultPageNumber, this.defaultPageSize);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });
  }

  editRequest(requestId: number) {
    this.router.navigate(['/homepage/edit-request/' + requestId]);
  }

  public CancelRequest(reqId:number)
  {
    this._service.cancelRequest(reqId).subscribe((res:apiResponse<string>)=>
    {
      this.openSnackBar(res.message,'OK');
    })
    this.router.navigate(['/homepage/requests']);
  }

  cancelDialog(reqId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirm Cancellation',
        message: 'Are you sure you want to cancel this request?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.CancelRequest(reqId);
      }
    });
  }

}
