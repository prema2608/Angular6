import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { EventEmitter } from 'events';
import { HelperClassService } from 'src/app/core/services/helper-class.service';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  createNote: FormGroup;
  submitted = false;
  public showHeader = false;
  token = localStorage.getItem('token')
  @Input() notes
  @Output() updateEvent = new EventEmitter();
  // @Input()colorss;
  constructor(private service: NoteService, public dialog: MatDialog,private helperClassService:HelperClassService,private formBuilder: FormBuilder, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.retriveNotes();
    this.createNote = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      remainder:''
    });
  }
  public retriveNotes() {
    this.service.retriveNote().subscribe((newNote: any) => {
      this.notes = newNote;
    },
      (error) => {
        console.log("invalid");
      });
  }
  get f() { return this.createNote.controls; }

  onSubmit(note) {
    this.submitted = true;

    if (this.createNote.invalid) {
      return;
    }
    console.log(this.token);
    console.log(note);
    this.service.createNote(note).subscribe(response => {
      this.retriveNotes();
      this.snackbar.open("Note has been created successfully", "OK", {
        duration: 2000
      });
    })
  }

  updateNote(note, noteId) {
    //  console.log(note);
    this.service.updateNote(note, noteId).subscribe(response => {
      console.log("updated");
    })
  }
 
  updateColor(data) {
   let colo= this.helperClassService.getColor();
    this.updateNote(data.note, data.note.noteId)
    // this.updateEvent.emit(data);
  }


//   public dailogCollaborator(note) {
//     const dialogRef = this.dialog.open(CollaboratorComponent, {
//       width: '500px',
//       height:'500px',
//       data: note
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       const data = { note }
//       this.updateEvent.emit(data);
//       console.log('The dialog was closed');
//     });
// // } 
//  public removeRemainder(note)
//   {
//     note.remainder=null;
//     console.log(note.remainder);
//     const data = { note }

//     this.updateEvent.emit(data);
// }
}