import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  token:any;

  constructor(private http :HttpService) { }
  retriveNote ()
{
  this.token=localStorage.getItem('token')
 
    var token=localStorage.getItem('token');
    var httpheaders={
     headers:new HttpHeaders({
       'Content-Type':'application/json',
       'token':token
     })
    }
  return this.http.getService(environment.noteurl+'retrivenote',httpheaders);
}
}
 