import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/services/note.service';
import { MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';

export interface DialogData {
  discription: string;
  title: string;
}

@Component({
  selector: 'app-list-of-notes',
  templateUrl: './list-of-notes.component.html',
  styleUrls: ['./list-of-notes.component.css']
})
export class ListOfNotesComponent implements OnInit {
  private notes: Note[] = [];

  constructor(private service: NoteService, public dialog: MatDialog) { }


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

  deleteNote(noteId) {
    //  console.log(note);
    this.service.deleteNote(noteId).subscribe(response => {
      this.ngOnInit();
      console.log("deleted");
  })
   }

  ngOnInit() {
    this.retriveNotes()
  }
  public retriveNotes() {
    this.service.retriveNote().subscribe((newNote: any) => {
      this.notes = newNote;
    },
      (error) => {
        console.log("invalid");
      });
  }
}
