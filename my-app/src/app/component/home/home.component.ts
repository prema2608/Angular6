import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HelperClassService } from 'src/app/core/services/helper-class.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Note } from 'src/app/core/models/note';
import { PhotosComponent } from '../photos/photos.component';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar, MatDialog } from '@angular/material';


interface ImageData {
  imageSrc: any;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  parentSubject: Subject<any> = new Subject();
  public grid = false;
  public searchValue = '';
  public imageData = <ImageData>{};
  public hide = true;
  public user
  public dynamicBind: Note;


  constructor(private router: Router, private helperClass: HelperClassService, private userService: UserService
    , private sanitizer: DomSanitizer, private snackBar: MatSnackBar, private dailog: MatDialog) { }

  ngOnInit() {
    this.getImage();
  }
  toggle() {
    this.parentSubject.next();
  }
  signOut() {
    this.router.navigate(['/login'])

  }

  public viewGrid() {
    this.grid = !this.grid;
    this.helperClass.setTheme(this.grid);
  }

  public searchtest() {
    this.helperClass.setSearchItem(this.searchValue);
    this.router.navigate(['home/search'])
  }

  clearSearch() {
    this.searchValue = '';
    this.router.navigate(['home/viewnote'])
  }


  getImage() {
    this.userService.downloadImage().subscribe(resp => {
      this.user = resp
      console.log(this.user)
      if (this.user.display_pic != null) {
        const url = `data:${this.user.contentType};base64,${this.user.display_pic}`;
        this.imageData = {
          imageSrc: this.sanitizer.bypassSecurityTrustUrl(url)
        }
      }
      else {
        this.imageData.imageSrc = null;
      }
    }, error => {
      this.snackBar.open("error to download image", "error", { duration: 2000 });
    }
    )
  }

  openDialog(): void {
    const dialogRef = this.dailog.open(PhotosComponent, {
      width: '500px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getImage();
      console.log('The dialog was closed');
    });
  }



}









