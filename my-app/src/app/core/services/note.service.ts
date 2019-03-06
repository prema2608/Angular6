import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  token: any;

  constructor(private http: HttpService) { }
  retriveNote() {
    var token = localStorage.getItem('token');
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    return this.http.getService(environment.noteurl + 'retrivenote', httpheaders);
  }

  createNote(note) {
    console.log(note)

    var token = localStorage.getItem('token');
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    return this.http.postHeaderService(environment.noteurl + 'createnote', note, httpheaders)

  }
  updateNote(note, id) {
    // console.log(note)
    var noteId = note.noteId;
    var token = localStorage.getItem('token');
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    return this.http.putService(environment.noteurl + 'updatenote/' + id, note, httpheaders)

  }
  deleteNote(noteId) {
    console.log(noteId)
    // var noteId=noteId.noteId;
    var token = localStorage.getItem('token');
    var httpheaders =
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    return this.http.deleteService(environment.noteurl + 'deletenote/' + noteId, httpheaders)
  }
}
