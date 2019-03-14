import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/core/models/note';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { HelperClassService } from 'src/app/core/services/helper-class.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public notes: Note[] = [];
  public grid = false;
  public searchString = '';

  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog, private helperService:HelperClassService) { }

  ngOnInit() {
    this.retriveNotes();
    this.helperService.getTheme().subscribe((resp) =>
      this.grid = resp
    );
    this.helperService.getSearchItem().subscribe((resp) =>
      this.searchString = resp);
  }

  public onUpdateNote(data) {
    this.updateMethod(data.note);
  }

  updateMethod(note) {
    this.noteService.updateNote(note, note.noteId).subscribe(response => {
      this.retriveNotes();
    },
      error => {
        console.log("error");
      })
  }

  public retriveNotes() {
    this.noteService.retriveNote().subscribe(newNote => {
      this.notes = newNote;
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

}
