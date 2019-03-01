import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: NoteService,private dialog :MatDialog,
    private router:Router) { }




  ngOnInit() {
    
  }

  signOut(){
    this.router.navigate(['/login'])
    
  }
  
  // openDialog(note): void {
  //   const dialogRef = this.dialog.open(UpdateNoteComponent, {
  //     width: '550px',
  //     data: 
  //     {title: note.title, discription: note.discription,id: note.id}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }
}