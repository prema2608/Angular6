import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  postService(url,object){
    return this.http.post<any>(url,object,{observe:"response"});
  }
  postHeaderService(url,object,header){
    return this.http.post<any>(url,object,header);
  }
  putService(url,object,header){
    return this.http.put<any>(url,object,header);
  }

  putServiceOnlyHeader(url,header){
    return this.http.put<any>(url,header);
  }
  getService(url,header):Observable<any>{
    return this.http.get<any>(url,header);
  }

  deleteService(url,header){
    return this.http.delete<any>(url,header);
  }

  postToUploadImage(url,object,header){
    return this.http.post<any>(url,object,header);
}
}
