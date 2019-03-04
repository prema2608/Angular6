import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  createNote: FormGroup;
  // panelOpenState = false;
  // discription = String;
  // title = String;
  // submitted = false;

  constructor(private noteservice: NoteService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.formBuilder.group({
      title: [''],
      description: ['', Validators.required]
    })

  }

  // updateNote(note) {
  //   this.noteservice.updateNote(note);
  // }

  // createNote(dis, title) {
  //   this.discription = dis
  //   this.title = title
  //   var note: {
  //     discription, title
  //   }
  //   console.log(note)
  //   this.noteservice.createNote(note);
  // }

  public onSubmit(note) {
 
    this.createNote = new FormGroup({
      title: new FormControl,
      description:new FormControl
   });
    if (this.createNote.invalid) {
      return;
    }
    console.log(note);
    this.noteservice.createNote(note).subscribe(response => {
      console.log("sucessfully created note");
    },
      (error) => {
        console.log(error);
      });

  }
}
