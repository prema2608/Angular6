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
  notes: Note[] = [];

  constructor(private service: NoteService, public dialog: MatDialog) { }


  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '600px',
      height: '300px',
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      this.service.updateNote(note, note.noteId)
    });
  }

  inTrash(note) {
    note.inTrash = 1;
    console.log(note)
    this.service.updateNote(note, note.noteId).subscribe(response=> {
      console.log("updated");
  })
  }
  inArchive(note) {
    note.archive = 1;
    console.log(note)
    this.service.updateNote(note, note.noteId).subscribe(response=> {
      console.log("updated");
  })
  }

  backupNote(note) {
    note.inTrash = 0;
    console.log(note)
    this.service.updateNote(note, note.noteId).subscribe(response=> {
      console.log("updated");
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
