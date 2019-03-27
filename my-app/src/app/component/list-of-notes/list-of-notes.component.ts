import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { labels } from 'src/app/core/models/labels';
import { CollaboratorComponent } from '../collaborator/collaborator.component';


export interface DialogData {
  discription: string;
  title: string;
}

@Component({
  selector: 'app-list-of-notes',
  templateUrl: './list-of-notes.component.html',
  styleUrls: ['./list-of-notes.component.scss']
})
export class ListOfNotesComponent implements OnInit {

  @Input() notes
  @Output() updateEvent = new EventEmitter();
  @Input() public grid = false;
  public labels: labels[] = [];
  public newLabels: labels[] = [];
  public filter: '';
  removable = true;

  constructor(private service: NoteService, public dialog: MatDialog) { }
  ngOnInit() {
    // this.retriveNotes();
    this.retriveLabels();
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '600px',
      height: '270px',
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(note)
      const data={note}
      this.updateEvent.emit(data);
      // this.service.updateNote(note, note.noteId).subscribe(resp=>
      //   console.log("updated"))
    });
  }

  inTrash(key,note) {
    note.inTrash = 1;
    console.log(note)
    const data = {key,note};
    this.updateEvent.emit(data);
    // this.service.updateNote(note, note.noteId).subscribe(response => {
      //this.retriveNotes();
    //   console.log("updated");
    // })
  }
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

  public retriveNotes() {
    this.service.retriveNote().subscribe((newNote: any) => {
      this.notes = newNote;
    },
      (error) => {
        console.log("invalid");
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



  onAddLabel(label, note) {
    this.service.mapLabelTONote(note.noteId, label).subscribe((resp: any) =>
      console.log(resp)
    ), (error) => {
      console.log(error)
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
      this.retriveNotes();
    }
    )
  }


  remove(note, label) {
    this.service.deletenotelabel(note.noteId, label.labelId).subscribe(response => {
      const data = { note }
      this.updateEvent.emit(data);
      console.log(response);
    }, (error) => console.log(error));
  }


  updateColor(data) {
    this.updateEvent.emit(data);
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
}
}
