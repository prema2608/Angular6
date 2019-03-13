import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  token = localStorage.getItem('token');
  httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    })
  }

  constructor(private http: HttpService) { }

  retriveNote() {
    return this.http.getService(environment.noteurl + 'retrivenote', this.httpheaders);
  }

  createNote(note) {
    return this.http.postHeaderService(environment.noteurl + 'createnote', note, this.httpheaders)

  }
  updateNote(note, id) {

    // var noteId = note.noteId;
    // var token = localStorage.getItem('token');
    // var httpheaders = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'token': token
    //   })g
    // }
    return this.http.putService(environment.noteurl + 'updatenote/' + id, note, this.httpheaders)

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
    return this.http.deleteService(environment.noteurl + 'deletenote/' + noteId, this.httpheaders)
  }

  ////labels

  createLabels(label) {
    console.log(label)

    var token = localStorage.getItem('token');
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    return this.http.postHeaderService(environment.noteurl + 'createlabel', label, this.httpheaders)

  }


  retriveLabels() {
    var token = localStorage.getItem('token');
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    return this.http.getService(environment.noteurl + 'retrievelabel', this.httpheaders);
  }

  // updateLabels(labels, id) {
  //   // console.log(note)
  //   var labelId = labels.labelId;
  //   var token = localStorage.getItem('token');
  //   var httpheaders = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'token': token
  //     })
  //   }
  //   return this.http.putService(environment.noteurl + 'updatelabel/' + id, labels, httpheaders)

  // }
  updateLabel(label): Observable<any> {
    var token = localStorage.getItem('token');
    var httpheaders =
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    return this.http.putService(environment.noteurl + 'updatelabel/' + label.labelId, label, this.httpheaders);
  }

  deleteLabels(labelId) {
    console.log(labelId)
    // var noteId=noteId.noteId;
    var token = localStorage.getItem('token');
    var httpheaders =
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    return this.http.deleteService(environment.noteurl + 'deletelabel/' + labelId, this.httpheaders)
  }


  mapLabelTONote(noteId, label) {
    return this.http.putServiceOnlyHeader(environment.noteurl + '/mergelabelnote/' + noteId, label);
  }


  // deletenotelabel(labelId, noteId) {
  //   return this.http.deleteService(environment.noteurl+'deletelabeltonote/' ,{
  //     params: {
  //       noteId: noteId,
  //       labelId: labelId
  //     },
  //     observe: 'response'
  //   }
  //   )
  // }

  deletenotelabel(noteId, labelId) {
    var httpheaders =
    {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'noteId': noteId
      })
    }
    return this.http.deleteService(environment.noteurl + 'delete-label-to-note/' + labelId, httpheaders)
  }
}
