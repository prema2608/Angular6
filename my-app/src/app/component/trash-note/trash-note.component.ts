import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { Note } from 'src/app/core/models/note';


@Component({
  selector: 'app-trash-note',
  templateUrl: './trash-note.component.html',
  styleUrls: ['./trash-note.component.css']
})
export class TrashNoteComponent implements OnInit {

  constructor( private service: NoteService, private snackbar: MatSnackBar,
    public dialog: MatDialog) { }


    notes: Note[] =[];
  

  ngOnInit() {
    this.retriveNotes();
  }

  deleteNote(noteId) {
    console.log(noteId);
    this.service.deleteNote(noteId).subscribe(response => {
      this.retriveNotes();
      this.snackbar.open('Note deleted successfully', 'OK', { duration: 2000 });
    }),
      error => {
        console.log(error);
        this.snackbar.open('Note cannot be deleted', 'Error', { duration: 2000 });
      }
  }

  backupNote(note) {
    note.inTrash = 0;
    console.log(note)
    this.service.updateNote(note, note.noteId).subscribe(response=> {
      console.log("updated");
  })
  }
  updateNote(note, noteId) {
    //  console.log(note);
    this.service.updateNote(note, noteId).subscribe(response => {
      console.log("updated");
    })
  }

 public retriveNotes() {
    this.service.retriveNote().subscribe((newNote: any) => {
      this.notes = newNote;
    },
      (error) => {
        console.log("invalid");
      });
  }
                         
  openDialog(notes): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '600px',
      height: '300px',
      data: notes
    });

    dialogRef.afterClosed().subscribe(result => {
      this.service.updateNote(notes, notes.noteId)
    });
  }
}
