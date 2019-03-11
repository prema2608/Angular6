import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { Note } from 'src/app/core/models/note';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-pin-notes',
  templateUrl: './pin-notes.component.html',
  styleUrls: ['./pin-notes.component.css']
})
export class PinNotesComponent implements OnInit {

  constructor(private service: NoteService, private snackbar: MatSnackBar,
    public dialog: MatDialog) { }

  notes: Note[] = [];


  ngOnInit() {
    this.retriveNotes();
  }


  inTrash(note) {
    note.inTrash = 1;
    console.log(note)
    this.service.updateNote(note, note.noteId).subscribe(response=> {
      this.retriveNotes();
      console.log("updated");
  })
  }
  deleteNote(noteId) {
    console.log(noteId);
    this.service.deleteNote(noteId).subscribe(response => {
      this.snackbar.open('Note deleted successfully', 'OK', { duration: 2000 });
    }),
      error => {
        console.log(error);
        this.snackbar.open('Note cannot be deleted', 'Error in note retrieval', { duration: 2000 });
      }
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

  unArchive(note) {
    note.archive = 0;
    console.log(note)
    this.service.updateNote(note, note.noteId).subscribe(response => {
      console.log("updated");
    })
  }

  unpinned(note) {
    note.pinned = 0;
    console.log(note)
    this.service.updateNote(note, note.noteId).subscribe(response => {
      this.retriveNotes();
      console.log("unpinned");
    })
  }
}
