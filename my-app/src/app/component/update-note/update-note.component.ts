import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { labels } from 'src/app/core/models/labels';


@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {
  @Input() notes
  @Output() updateEvent = new EventEmitter();
  public labels: labels[] = [];
  public newLabels: labels[] = [];
  public filter: '';
  removable = true;
  updateNoteForm: FormGroup;
  public mytoken = localStorage.getItem('token');


  constructor(
    public dialogRef: MatDialogRef<UpdateNoteComponent>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: NoteService,
    private formBuilder: FormBuilder) { }
 
  ngOnInit() {
    this.retriveNotes();
    this.updateNoteForm = this.formBuilder.group({});
    this.retriveLabels();

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

 

  inArchive(key,note) {
    note.pinned = 0;
    note.archive = key == 'archive' ? 1 : 0;
    console.log(note)
    const data = {key,note};
    this.updateEvent.emit(data);
    this.dialogRef.close();
  }

  pinned(key,note) {
    note.pinned = key == 'pinned'? 1 : 0;
    console.log(note)
    const data = {key,note};
    this.updateEvent.emit(data);
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

  closeClick() {
    this.dialogRef.close();
  }

  public updateReminder(note,selectedMoment)
  {
    note.remainder=selectedMoment;
    console.log(note.remainder);
    const data = { note }
    this.updateEvent.emit(data);
  }

  public removeRemainder(note)
  {
    note.remainder=null;
    console.log(note.remainder);
    const data = { note }
    this.updateEvent.emit(data);
    this.dialogRef.close();
}



inTrash(key,note) {
  note.inTrash = 1;
  console.log(note)
  const data = {key,note};
  this.updateEvent.emit(data);
  this.dialogRef.close();
  
}

remove(note, label) {
  this.service.deletenotelabel(note.noteId, label.labelId).subscribe(response => {
    // const data = { note }
    // this.updateEvent.emit(data);
    this.dialogRef.close();
    console.log(response);
  }, (error) => console.log(error));
}



public dailogCollaborator(note) {
  const dialogRef = this.dialog.open(CollaboratorComponent, {
    width: '500px',
    height:'500px',
    data: note
  
  });
  dialogRef.afterClosed().subscribe(result => {
    const data = { note }
    this.updateEvent.emit(data);
    console.log('The dialog was closed');
  });
}


public retriveLabels() {
  this.service.retriveLabels().subscribe((newlabel: any) => {
    this.labels = newlabel;
  },
    (error) => {
      console.log("invalid");
    });
}

public labelFilter(event, noteLabels) {
  event.stopPropagation();
  console.log(noteLabels);
  console.log(this.labels);
  this.newLabels.length = 0;
  var k = 0;
  for (var i = 0; i < this.labels.length; i++) {
    var present = 0;
    for (var j = 0; j < noteLabels.length; j++) {
      if (this.labels[i].labelId === noteLabels[j].labelId && present === 0) {
        present = 1;
      }
    }
    if (present === 0) {
      this.newLabels[k] = this.labels[i];
      k++;
    }
  }
}


addLabelToNote(event, label, notes) {
  event.stopPropagation();
  console.log(label);
  console.log(notes);
  this.service.mapLabelTONote(notes.noteId, label).subscribe((resp) => {
    // const data = { notes }
    // console.log(data)
    // console.log(label)
    // this.updateEvent.emit(data);
    // this.retriveNotes();
    this.dialogRef.close();
  }
  )
}

}
