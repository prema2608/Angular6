import { Component, OnInit, Output } from '@angular/core';

import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/core/services/note.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  parentSubject:Subject<any> = new Subject();

  constructor(private service: NoteService,private dialog :MatDialog,
    private router:Router) { }

  ngOnInit() {
    
  }
  toggle() {
    this.parentSubject.next();
  }
  signOut(){
    this.router.navigate(['/login'])
    
  }
 
}