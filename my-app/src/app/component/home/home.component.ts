import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HelperClassService } from 'src/app/core/services/helper-class.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  parentSubject: Subject<any> = new Subject();
  public grid = false;

  constructor( private router: Router,private helperClass:HelperClassService ) { }

  ngOnInit() {

  }
  toggle() {
    this.parentSubject.next();
  }
  signOut() {
    this.router.navigate(['/login'])

  }

  public viewGrid() {
    this.grid = !this.grid;
    this.helperClass.setTheme(this.grid);
}

}