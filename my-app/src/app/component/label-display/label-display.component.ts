import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HelperClassService } from 'src/app/core/services/helper-class.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-label-display',
  templateUrl: './label-display.component.html',
  styleUrls: ['./label-display.component.css']
})
export class LabelDisplayComponent implements OnInit {

  public grid = false;
  public notes: Note[] = [];
  public newNotes: Note[] = [];
  public labelName: string;


  constructor(private noteService: NoteService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog, private helperService: HelperClassService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.labelName = params['labelName'];
      this.helperService.getTheme().subscribe((resp) =>
        this.grid = resp
      );
      this.getNotes();
    });
  }

  public onUpdateNote(data) {
    this.updateMethod(data.note);
  }

  updateMethod(note) {
    this.noteService.updateNote(note, note.noteId).subscribe(response => {
      this.getNotes();
    },
      error => {
        console.log("error");
      })
  }

  public getNotes() {
    this.noteService.retriveNote().subscribe(newNote => {
      this.notes = newNote;
      this.filterLabel(this.notes);
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

  public filterLabel(notes) {
    this.newNotes.length = 0;
    notes.filter((note) => {
      note.labelList.filter((label) => {
        if (this.labelName == label.labelName && !note.inTrash) {
          this.newNotes.push(note);
        }
      })
    })
    return this.newNotes;
  }

}
