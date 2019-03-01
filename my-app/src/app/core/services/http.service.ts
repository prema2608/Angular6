import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  postService(url,object){
    return this.http.post<any>(url,object,{observe:"response"});
  }

  putService(url,object,header){
    return this.http.put<any>(url,object,header);
  }

  getService(url,header){
    return this.http.get<any>(url,header);
  }
 

  deleteService(url,header){
    return this.http.delete<any>(url,header);
  }
}
