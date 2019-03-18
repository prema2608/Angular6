import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { HelperClassService } from 'src/app/core/services/helper-class.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<PhotosComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.userService.uploadImage(this.currentFileUpload).subscribe(event => {
      this.snackBar.open("image uploaded", "ok", { duration: 2000 });
      this.dialogRef.close();
    });
  }
  close() {
    this.dialogRef.close();
  }

  removeImage()
  {
    this.userService.removeImage().subscribe(event => {
      this.snackBar.open("image removed", "ok", { duration: 2000 });
      this.dialogRef.close();
    });
  }

}
  

