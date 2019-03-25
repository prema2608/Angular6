import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';
import { Note } from 'src/app/core/models/note';
import { DomSanitizer } from '@angular/platform-browser';
import { NoteService } from 'src/app/core/services/note.service';

// interface ImageData {
//   imageSrc: any;
// }
@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
 
  export class CollaboratorComponent implements OnInit {
  
    public user : any;
    // public imageData = <ImageData>{};
    public myControl = new FormControl();
    public users: User[] = [];
    public collabUsers: User[] = [];
  
    constructor(private userService: UserService, public dialogRef: MatDialogRef<CollaboratorComponent>,
      @Inject(MAT_DIALOG_DATA) public note,
      private snackBar: MatSnackBar, private sanitizer: DomSanitizer,
      private noteService: NoteService) { }
  
    ngOnInit() {
      // this.getImage();
      this.getNoteOwner();
      this.getUsers();
      this.getCollaborateUser();
    }

    public getNoteOwner()
    {
      console.log(this.note.userId)
      this.userService.getCollaborateUser(this.note.userId).subscribe(
        (user) => {
          console.log("body::::",user);
          this.user=user});
    }
  


    public getUsers() {
      this.userService.getUsers().subscribe(({ body }) => {
        this.users = body;
        console.log(this.users)
      }
        , error => console.log(error));
    }
  
    collaborate(emailId) {
      this.userService.verifyEmail(emailId).subscribe(user => {
        if(user.id===this.note.userId)
        {
          this.snackBar.open("you cannot add the owner", "error", { duration: 2000 });
          return;
        }
        this.snackBar.open("emailId verified", "ok", { duration: 2000 });
        this.noteService.createCollaborator(this.note.noteId, user.id).subscribe(resp => {
          this.dialogRef.close();
          this.snackBar.open("added to collaborator", "ok", { duration: 2000 })
        }
        )
      }, error => { this.snackBar.open("email not present or collaborator already present", "error", { duration: 2000 }) });
  
    }
  
    closeClick() {
      this.dialogRef.close();
    }
  
    // getImage() {
    //   this.userService.downloadImage().subscribe(resp => {
    //     this.user = resp
    //     if (this.user.profilePicture != null) {
    //       const url = `data:${this.user.contentType};base64,${this.user.profilePicture}`;
    //       this.imageData = {
    //         imageSrc: this.sanitizer.bypassSecurityTrustUrl(url)
    //       }
    //     }
    //     else {
    //       this.imageData.imageSrc = null;
    //     }
    //   }, error => {
    //     this.snackBar.open("error to download image", "error", { duration: 2000 });
    //   }
    //   )
    // }
  
    getCollaborateUser() {
      for (let i = 0; i < this.note.collaborators.length; i++) {
        var k = 0;
        console.log(this.note.collaborators[i].userId);
        this.userService.getCollaborateUser(this.note.collaborators[i].userId).subscribe(
          user => {
            this.collabUsers[k] = user;
            k++;
          }
          , error => console.log(error))
      }
    }
  
    removeCollaborator(collabUser) {
      this.noteService.removeCollaborateUser(this.note.noteId, collabUser.id).subscribe(resp => {
        console.log(resp)
        this.snackBar.open("collaborator removed", "ok", { duration: 2000 });
        this.dialogRef.close();
      }, error =>
          this.snackBar.open("collaborator connot be removed", "error", { duration: 2000 })
      )
    }
  
  }
 

