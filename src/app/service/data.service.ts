import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  registerUser(data:any){
    return this.http.post(environment.baseUrl+'auth/register',data);
  }
  loginUser(data:any){
    return this.http.post(environment.baseUrl+'auth/login',data);
  }
}
