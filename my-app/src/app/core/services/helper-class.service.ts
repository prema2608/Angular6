import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperClassService {

  public theme: Subject<any> = new Subject();
  public searchItem :Subject<any>=new Subject();
 
  
  constructor() { }

  public setTheme(themeChanged: boolean) {
    this.theme.next(themeChanged);
  }

  public getTheme() {
    return this.theme;
  }

  public setSearchItem(searchItem:String)
  {
    this.searchItem.next(searchItem);
  }

  public getSearchItem()
  {
    return this.searchItem;
  }


}
