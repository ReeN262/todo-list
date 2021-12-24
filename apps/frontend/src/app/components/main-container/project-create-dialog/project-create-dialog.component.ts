import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

class DialogOverviewExampleDialog {
}

@Component({
  selector: 'app-project-create-dialog',
  templateUrl: './project-create-dialog.component.html',
  styleUrls: ['./project-create-dialog.component.css']
})
export class ProjectCreateDialogComponent  {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any // DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
