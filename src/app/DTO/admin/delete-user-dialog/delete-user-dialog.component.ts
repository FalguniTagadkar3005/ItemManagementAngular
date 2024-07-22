import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [ MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,MatButtonModule],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.css'
})
export class DeleteUserDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick()
  {
    this.dialogRef.close(false);
  }

  onYesClick()
  {
    this.dialogRef.close(true);
  }
}
