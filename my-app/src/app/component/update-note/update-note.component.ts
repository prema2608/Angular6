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
  updateNoteForm: FormGroup;
  public mytoken = localStorage.getItem('token');


  constructor(
    public dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: NoteService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.retriveNotes();
    this.updateNoteForm = this.formBuilder.group({});

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

  // inArchive(note) {
  //   note.archive = 1;
  //   note.pinned = 0;
  //   console.log(note)
  //   this.dialogRef.close();

  //   // this.service.updateNote(note, note.noteId).subscribe(response => {
  //   //   console.log("updated");
  //   //   this.dialogRef.close();
  //   // })
  // }



  inArchive(key,note) {
    note.pinned = 0;
    note.archive = key == 'archive' ? 1 : 0;
    console.log(note)
    const data = {key,note};
    this.updateEvent.emit(data);
    // this.service.updateNote(note, note.noteId).subscribe(response => {
    //   this.retriveNotes()
    //   console.log("updated");
    // })
  }
  pinned(key,note) {
    note.pinned = key == 'pinned'? 1 : 0;
    console.log(note)
    const data = {key,note};
    this.updateEvent.emit(data);
    // this.service.updateNote(note, note.noteId).subscribe(response => {
    //   this.retriveNotes()
    //   console.log("pinned");
    // })
  }

  updateNote(note, noteId) {
    //  console.log(note);
    this.service.updateNote(note, noteId).subscribe(response => {
      console.log("updated");
    })
  }

  updateColor(data) {
    this.updateNote(data.note, data.note.noteId)
    // this.updateEvent.emit(data);
  }
}



