import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../list-of-notes/list-of-notes.component';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {
  @Input() notes
  updateNoteForm:FormGroup;
  public mytoken = localStorage.getItem('token'); 
  
 
  constructor(
   public dialogRef: MatDialogRef<UpdateNoteComponent>,
   @Inject(MAT_DIALOG_DATA) public data: DialogData,
   
   private service: NoteService,
   private formBuilder:FormBuilder) {}
 
   ngOnInit() {
    this.retriveNotes();
     this.updateNoteForm=this.formBuilder.group({});
     
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


   inArchive(note) {
    note.archive = 1;
    console.log(note)
    this.service.updateNote(note, note.noteId).subscribe(response => {
      this.retriveNotes()
      console.log("updated");
    })
  }
   updateNote(note,noteId) {
    //  console.log(note);
    this.service.updateNote(note,noteId).subscribe(response => {
      console.log("updated");
  })
   }

}




