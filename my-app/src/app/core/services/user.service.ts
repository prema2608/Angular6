import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token = localStorage.getItem('token');
  public httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    })
};

  constructor(private http :HttpService ) { }

login (user)
{
  return this.http.postService(environment.url+'login',user);
  
}

register (user): Observable<any>{
  return this.http.postService(environment.url+'register',user);
}



uploadImage(file): Observable<any> {
  const formdata = new FormData();
  formdata.append("file", file);
  return this.http.postToUploadImage(environment.url + 'image/' + this.token, formdata, {
    reportProgress: true,
    responseType: 'text'
  }
  );
}

downloadImage():Observable<any> {
  return this.http.getService(environment.url + 'image', this.httpheaders);
}

removeImage()
{
  return this.http.deleteService(environment.url + 'image',this.httpheaders);
}

}
