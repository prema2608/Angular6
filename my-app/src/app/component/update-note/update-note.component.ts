import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData, ListOfNotesComponent } from '../list-of-notes/list-of-notes.component';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {

  updateNoteForm:FormGroup;
  public mytoken = localStorage.getItem('token'); 
  
 
  constructor(
   public dialogRef: MatDialogRef<UpdateNoteComponent>,
   @Inject(MAT_DIALOG_DATA) public data: DialogData,
   
   private service: NoteService,
   private formBuilder:FormBuilder) {}
 
   ngOnInit() {
     this.updateNoteForm=this.formBuilder.group({});
     
   }
   
   onNoClick(): void {
     this.dialogRef.close();
   }

   updateNote(note,noteId) {
    //  console.log(note);
    this.service.updateNote(note,noteId).subscribe(response => {
      console.log("updated");
  })
   }

}




