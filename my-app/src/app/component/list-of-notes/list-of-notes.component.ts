import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/services/note.service';
import { MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { labels } from 'src/app/core/models/labels';


export interface DialogData {
  discription: string;
  title: string;
}

@Component({
  selector: 'app-list-of-notes',
  templateUrl: './list-of-notes.component.html',
  styleUrls: ['./list-of-notes.component.css']
})
export class ListOfNotesComponent implements OnInit {

  @Input() notes
  @Output() updateEvent = new EventEmitter();
  note: Note[] = [];
  labels: labels[] = [];


  public newLabels: labels[] = [];

  constructor(private service: NoteService, public dialog: MatDialog) { }
  ngOnInit() {
    this.retriveNotes();
    this.retriveLabels();
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '600px',
      height: '270px',
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      this.service.updateNote(note, note.noteId)
    });
  }

  inTrash(note) {
    note.inTrash = 1;
    console.log(note)
    this.service.updateNote(note, note.noteId).subscribe(response => {
      this.retriveNotes();
      console.log("updated");
    })
  }
  inArchive(note) {
    note.archive = 1;
    console.log(note)
    this.service.updateNote(note, note.noteId).subscribe(response => {
      this.retriveNotes()
      console.log("updated");
    })
  }

  backupNote(note) {
    note.inTrash = 0;
    console.log(note)
    this.service.updateNote(note, note.noteId).subscribe(response => {
      console.log("updated");
    })
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
    this.service.mapLabelTONote(notes.noteId, label).subscribe((resp: any) => {
      const data = { notes }
      console.log(data)
      console.log(label)

      this.updateEvent.emit(data);
    }
    ), (error) => {
      console.log(error)
    }
  }


  remove(label, notes) {
    this.service.deletenotelabel(label.labelId, notes.noteId).subscribe(response => {
      const data = { notes }
      this.updateEvent.emit(data);
      console.log(response);
    }, (error) => console.log(error));
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


}
