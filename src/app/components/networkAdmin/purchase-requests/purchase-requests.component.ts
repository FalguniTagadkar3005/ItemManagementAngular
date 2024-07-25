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
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from '../../../DTO/admin/delete-user-dialog/delete-dialog.component';
import { getAllPurchaseRequest, getAllPurchaseRequestResponse, getAllPurchaseRequestSingleResponse } from '../../../DTO/networkAdmin';
import { NetworkAdminService } from '../../../services/network-admin.service';

@Component({
  selector: 'app-purchase-requests',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterModule,
    MatSortModule, ReactiveFormsModule, MatPaginatorModule, MatDialogModule, MatSnackBarModule,DatePipe,CommonModule],
  templateUrl: './purchase-requests.component.html',
  styleUrl: './purchase-requests.component.css'
})

export class PurchaseRequestsComponent {
  displayedColumns: string[] = ['date', 'invoiceNumber', 'purchaseRequestId'];
  dataSource: MatTableDataSource<getAllPurchaseRequestSingleResponse>
  defaultSortBy: string = 'date';
  defaultSortOrder: string = 'asc';
  formBuilder: FormBuilder;
  totalItems: number;
  defaultPageNumber:number=1;
  defaultPageSize:number=5;

  invoiceNumberFilter:string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchFiltersForm: FormGroup;

  constructor(private _service: NetworkAdminService, private router: Router, private _formBuilder: FormBuilder, private dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.searchFiltersForm = this._formBuilder.group({
      invoiceNumber:['',[]]
    })
    this.GetAllPurchaseRequests("", this.defaultPageNumber, this.defaultPageSize);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  public GetAllPurchaseRequests(invoiceNumber: string,pageNumber: number, pageSize: number): void {
    let body: getAllPurchaseRequest = {
      invoiceNumber: invoiceNumber,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortingOn: this.defaultSortBy,
      sortingWay: this.defaultSortOrder == 'asc' ? 1 : 2
    };
    this._service.getAllPurchaseRequest(body).subscribe((res: apiResponse<getAllPurchaseRequestResponse>) => {
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
    this.GetAllPurchaseRequests(this.getControls['invoiceNumber']?.value, this.defaultPageNumber, this.defaultPageSize);
  }

  public addRequest() {
    this.router.navigate(['/homepage/add-purchase-request']);
  }


  announceSortChange(sortState: Sort) {
    console.log(sortState.active + " " + sortState.direction);
    if (sortState.direction) {
      this.defaultSortBy = sortState.active;
      this.defaultSortOrder = sortState.direction;
      this.GetAllPurchaseRequests(this.getControls['invoiceNumber']?.value, this.defaultPageNumber, this.defaultPageSize);
    }
  }

  onPageChangeEvent(event: PageEvent) {
    this.defaultPageNumber = event.pageIndex+1;
    this.defaultPageSize = event.pageSize;
    this.GetAllPurchaseRequests(this.getControls['invoiceNumber']?.value, this.defaultPageNumber, this.defaultPageSize);
  }

  onReset() {
    this.invoiceNumberFilter = "";
    this.defaultPageNumber = 1;
    this.defaultPageSize = 5;
    this.GetAllPurchaseRequests(this.getControls['invoiceNumber']?.value, this.defaultPageNumber, this.defaultPageSize);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });
  }

}
