import { Component, OnInit, Input, Output } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { EventEmitter } from 'events';

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
  constructor(private service: NoteService, private formBuilder: FormBuilder, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.retriveNotes();
    this.createNote = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
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
    this.updateNote(data.note, data.note.noteId)
    // this.updateEvent.emit(data);
  }

}