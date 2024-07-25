import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { apiResponse } from '../../../DTO/customObjects';
import { allUsersResponse, allUsersRequest, allUsersResponseWithCount } from '../../../DTO/admin';
import { AdminService } from '../../../services/admin.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../DTO/admin/delete-user-dialog/delete-dialog.component';
import { MatSnackBar, MatSnackBarLabel, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterModule,
    MatSortModule, ReactiveFormsModule, MatPaginatorModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'userId'];
  dataSource: MatTableDataSource<allUsersResponse>
  defaultSortBy: string = 'name';
  defaultSortOrder: string = 'asc';
  formBuilder: FormBuilder;
  totalItems: number;
  defaultPageNumber:number=1;
  defaultPageSize:number=5;
  nameOrEmailFilter:string;
  roleIdFilter:number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchFiltersForm: FormGroup;

  constructor(private _service: AdminService, private router: Router, private _formBuilder: FormBuilder, private dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.searchFiltersForm = this._formBuilder.group({
      nameOrEmail: ['', []],
      roleId: ['', []],
    })
    this.GetAllUser("", 0, this.defaultPageNumber, this.defaultPageSize);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  public GetAllUser(name: string, roleId: number, pageNumber: number, pageSize: number): void {
    let body: allUsersRequest = {
      nameOrEmail: name,
      roleId: roleId,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortingOn: this.defaultSortBy,
      sortingWay: this.defaultSortOrder == 'asc' ? 1 : 2
    };
    this._service.getAllUsers(body).subscribe({
      next: (res: apiResponse<allUsersResponseWithCount>) => {
        this.dataSource = new MatTableDataSource(res.data.records);
        this.totalItems = res.data.totalRecords;
      }, error(err) {
        console.log(err)
      },
    });
  }

  get getNameOrEmail() {
    return this.searchFiltersForm.get('nameOrEmail');
  }

  get getRoleId() {
    return this.searchFiltersForm.get('roleId');
  }

  onSubmit() {
    this.defaultPageNumber = 1;
    this.defaultPageSize=5;
    this.GetAllUser(this.getNameOrEmail?.value, this.getRoleId?.value == "" ? 0 : this.getRoleId?.value, this.defaultPageNumber, this.defaultPageSize);
  }

  public addUser() {
    this.router.navigate(['/homepage/add-user']);
  }

  announceSortChange(sortState: Sort) {
    console.log(sortState.active + " " + sortState.direction);
    if (sortState.direction) {
      this.defaultSortBy = sortState.active;
      this.defaultSortOrder = sortState.direction;
      this.GetAllUser(this.getNameOrEmail?.value, this.getRoleId?.value == "" ? 0 : this.getRoleId?.value, this.defaultPageNumber, this.defaultPageSize);
    }
  }

  onPageChangeEvent(event: PageEvent) {
    this.defaultPageNumber = event.pageIndex+1;
    this.defaultPageSize = event.pageSize;
    this.GetAllUser(this.getNameOrEmail?.value, this.getRoleId?.value == "" ? 0 : this.getRoleId?.value,this.defaultPageNumber, this.defaultPageSize);
  }

  onReset() {
    this.nameOrEmailFilter = "";
    this.roleIdFilter = 0;
    this.defaultPageNumber = 1;
    this.defaultPageSize = 5;
    this.GetAllUser("", 0, this.defaultPageNumber, this.defaultPageSize);
  }

  deleteUserDialog(userId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this user?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteUser(userId);
      }
    });
  }

  public DeleteUser(id: number) {
    this._service.deleteUser(id).subscribe((res: apiResponse<string>) => {
      this.openSnackBar(res.message, "Ok");
      this.GetAllUser(this.getNameOrEmail?.value, this.getRoleId?.value == "" ? 0 : this.getRoleId?.value,this.defaultPageNumber, this.defaultPageSize);
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });
  }

  editUser(userId: number) {
    this.router.navigate(['/homepage/edit-user/' + userId]);
  }
}
