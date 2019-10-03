import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '..//environments/environment';
//import { environment } from '..//environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  public options:any;
  constructor(private http: HttpClient) { 
    this.options = {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('session_token')
      })
    };;
  }
  public get(url:string):Observable<any>{
    return this.http.get(environment.apiUrl+url,this.options);
  }
  public post(url:string,body:any):Observable<any>{
    return this.http.post(environment.apiUrl+url,body,this.options);
  }
  public put(url:string,body:any):Observable<any>{
    return this.http.put(environment.apiUrl+url,body,this.options);
  }
  public patch(url:string,body:any):Observable<any>{
    return this.http.patch(environment.apiUrl+url,body,this.options);
  }
  public delete(url:string):Observable<any>{
    return this.http.delete(environment.apiUrl+url,this.options);
  }
}
