import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { EditLabelsComponent } from '../edit-labels/edit-labels.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { labels } from 'src/app/core/models/labels';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-side-navibar',
  templateUrl: './side-navibar.component.html',
  styleUrls: ['./side-navibar.component.css']
})
export class SideNavibarComponent implements OnInit, OnDestroy 
{
  @Input()//this is used to inject the parent class into child class
  parentSubject: Subject<any>;

  constructor(public dialog: MatDialog, private service: NoteService,
    private snackbar: MatSnackBar) { }

  @ViewChild('drawer') public drawer;

  labels: labels[] = [];

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      this.drawer.toggle();
    });
    this.retriveLabels();
  }

  public retriveLabels() {
    this.service.retriveLabels().subscribe((newlabel: any) => {
      this.labels = newlabel;
    },
      (error) => {
        console.log("invalid");
      });
  }

  ngOnDestroy() {
    // its a clean up method called when ever the instance is destroyed
    this.parentSubject.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditLabelsComponent, {
      width: '300px',
      height: '300px',
      data: ''
    });
  }


}
