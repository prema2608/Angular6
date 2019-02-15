import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http :HttpService ) { }

login (user)
{
  this.http.postService(environment.url+'login',user).subscribe(response => {
    console.log(response);
    if (response.status == 200) {
      console.log(response.body.headers);
      localStorage.setItem('Authorization', response.body.headers);
    }
    else{
      console.log(response.body.header);
    }
});
  
}

register (user)
{
  this.http.postService(environment.url+'register',user).subscribe(response => {
    console.log(response);
    if (response.status == 200) {
      console.log(response.body.headers);
      localStorage.setItem('Authorization', response.body.headers);
    }
    else{
      console.log(response.body.header);
    }
});
}
}
