import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { labels } from '../models/labels';

@Injectable({
  providedIn: 'root'
})
export class HelperClassService {

  public theme: Subject<any> = new Subject();
  // public labels:labels[];
  
  constructor() { }

  public setTheme(themeChanged: boolean) {
    this.theme.next(themeChanged);
  }

  public getTheme() {
    return this.theme;
  }
}
