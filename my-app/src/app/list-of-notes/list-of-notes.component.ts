import { Component, OnInit } from '@angular/core';
import { NoteService } from '../core/services/note.service';
import { Note } from '../core/models/note';

@Component({
  selector: 'app-list-of-notes',
  templateUrl: './list-of-notes.component.html',
  styleUrls: ['./list-of-notes.component.css']
})
export class ListOfNotesComponent implements OnInit {
 private notes:Note[]=[];

  constructor(private service:NoteService) { }

  ngOnInit() {
    this.retriveNotes()
  }
  public retriveNotes () {
    this.service.retriveNote().subscribe((newNote:any) => {
      this.notes=newNote;
  },
      (error) => {
          console.log("invalid");
      });
  }
}
