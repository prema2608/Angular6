import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-palet',
  templateUrl: './color-palet.component.html',
  styleUrls: ['./color-palet.component.scss']
})
export class ColorPaletComponent implements OnInit {

  
  @Input() newNote
  @Output() colorChange=new EventEmitter();

  public colors=['rgb(224, 224, 224)','rgb(242, 139, 130)', 'rgb(251, 188, 4)','rgb(255, 244, 117)',
  'rgb(204, 255, 144)', 'rgb(167, 255, 235)', 'rgb(203, 240, 248)', 'rgb(174, 203, 250)','rgb(215, 174, 251)','rgb(253, 207, 232)','rgb(230, 201, 168)','rgb(232, 234, 237)'];
  constructor() { }

  ngOnInit() {
  }

  changeColor(color){
    this.newNote.color=color;
    const note = this.newNote;
    const data={note};
    this.colorChange.emit(data);
  }

}
