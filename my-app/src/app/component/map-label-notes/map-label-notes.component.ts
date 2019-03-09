import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { labels } from 'src/app/core/models/labels';

@Component({
  selector: 'app-map-label-notes',
  templateUrl: './map-label-notes.component.html',
  styleUrls: ['./map-label-notes.component.css']
})
export class MapLabelNotesComponent implements OnInit {

  constructor(public dialog: MatDialog,private service: NoteService ) { }

  labels: labels[] = [];
  ngOnInit() {
    this.retriveLabels;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(MapLabelNotesComponent, {
      width: '300px',
      height: '300px',
      data: ''
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
}
