import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/services/note.service';
import { HelperClassService } from 'src/app/core/services/helper-class.service';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.css']
})
export class ViewnoteComponent implements OnInit {

  public notes: Note[] = [];
  public grid = false;
  constructor(private service: NoteService, private helperClass: HelperClassService) { }

  ngOnInit() {
    this.retriveNotes();
    this.helperClass.getTheme().subscribe((resp) =>
      this.grid = resp
    );
  }

  public updateEvent(event) {
    this.updateNote(event.note);
  }

  private retriveNotes() {
    this.service.retriveNote().subscribe((newNote: any) => {
      this.notes = newNote;
    },
      (error) => {
        console.log("invalid");
      });
  }

  private updateNote(note) {
    this.service.updateNote(note, note.noteId).subscribe(response => {
      this.retriveNotes();
      console.log("updated");
    },
      (error) => {
        console.log(error);
      })
  }

}
