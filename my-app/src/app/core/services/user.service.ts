import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http :HttpService ) { }

login (user)
{
  return this.http.postService(environment.url+'login',user);
  
}

register (user): Observable<any>{
  return this.http.postService(environment.url+'register',user);
}
}
