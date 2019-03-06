import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navibar',
  templateUrl: './side-navibar.component.html',
  styleUrls: ['./side-navibar.component.css']
})
export class SideNavibarComponent implements OnInit, OnDestroy {
  @Input()//this is used to inject the parent class into child class
  parentSubject:Subject<any>;
  constructor() { }
@ViewChild('drawer') public drawer;
ngOnInit() {
  this.parentSubject.subscribe(event => {
    this.drawer.toggle();
  });
}

ngOnDestroy() {
  // its a clean up method called when ever the instance is destroyed
  this.parentSubject.unsubscribe();
}
// navigation(){
//   this.router.navigate(['/home/trash'])
// }
}
