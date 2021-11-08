import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { HttpInterceptor} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService implements HttpInterceptor{

  constructor(private http:HttpClient) { }

  intercept(req:any, next:any){
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: "bearer "+localStorage.getItem('authToken')
      }
    });
    return next.handle(tokenizedReq)
  }

  registerUser(data:any){
    return this.http.post(environment.baseUrl+'auth/register',data);
  }
  loginUser(data:any){
    return this.http.post(environment.baseUrl+'auth/login',data);
  }
  getIpInfos(){
    return this.http.get(environment.baseUrl+'ip/getIpInfo',
      {headers: new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('authToken')})});
  }
  submitIPData(data:any){
    return this.http.post(environment.baseUrl+'ip/submitIPData',data);
  }
}
