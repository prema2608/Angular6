import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../list-of-notes/list-of-notes.component';
import { NoteService } from 'src/app/core/services/note.service';


@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {
  @Input() notes
  @Output() updateEvent = new EventEmitter();
  updateNoteForm:FormGroup;
  public mytoken = localStorage.getItem('token'); 
  
 
  constructor(
   public dialogRef: MatDialogRef<UpdateNoteComponent>,
   @Inject(MAT_DIALOG_DATA) public data: DialogData,
   
   private service: NoteService,
   private formBuilder:FormBuilder) {}
 
   ngOnInit() {
    this.retriveNotes();
     this.updateNoteForm=this.formBuilder.group({});
     
   }
   
   onNoClick(): void {
     this.dialogRef.close();
   }
   public retriveNotes() {
    this.service.retriveNote().subscribe((newNote: any) => {
      this.notes = newNote;
    },
      (error) => {
        console.log("invalid");
      });
  }


   inArchive(note) {
    note.archive = 1;
    console.log(note)
    this.service.updateNote(note, note.noteId).subscribe(response => {
      this.retriveNotes()
      console.log("updated");
    })
  }
   updateNote(note,noteId) {
    //  console.log(note);
    this.service.updateNote(note,noteId).subscribe(response => {
      console.log("updated");
  })
   }

  updateColor(data) {
    this.updateEvent.emit(data);
  }
}




// import class UpdatenoteComponent implements OnInit {

//   visible = true;
//   selectable = true;
//   removable = true;
//   addOnBlur = true;
//   selectedMoment=new Date();
//   min=new Date();

//   constructor(public dialogRef: MatDialogRef<UpdatenoteComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: Note, private noteService: NoteService,
//     private snackBar: MatSnackBar,private dialog:MatDialog) { }

//   ngOnInit() {
//   }

//   closeClick(newNote) {
//     console.log(newNote.title);
//     console.log(newNote.description);
//     this.updateNote(newNote);
//   }

//   moveToTrash(note) {
//     note.inTrash = 1;
//     console.log(note);
//     this.updateNote(note);
//   }

//   updateArchiveNote(key, data) {
//     data.archive = key === 'archive' ? 1 : 0;
//     data.pinned = 0;
//     this.updateNote(data);
//   }

//   pinned(key, note) {
//     note.pinned = key === 'pinned' ? 1 : 0;
//     this.updateNote(note);
//   }

//   updateNote(newNote) {
//     this.noteService.updateNote(newNote, newNote.noteId).subscribe(response => {
//       console.log(response);
//       this.dialogRef.close();
//     },
//       error => {
//         console.log("error");
//       })
//   }

//   removeLabel(label, note) {
//     this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
//       console.log("deleting check in database");
//       this.dialogRef.close();
//     }, (error) => console.log(error));
//   }

//   addNoteLabel(data) {
//     this.updateNote(data.note);
//   }

//   updateColor(data) {
//     this.updateNote(data.note);
//   }

//   saveRemainder(selectedMoment, note) {
//     note.remainder = selectedMoment;
//     this.updateNote(note);
//   }

//   public dailogCollaborator(note) {
//     const dialogRef = this.dialog.open(CollaboratorComponent, {
//       width: '500px',
//       data: note
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//     });
//   }
// }