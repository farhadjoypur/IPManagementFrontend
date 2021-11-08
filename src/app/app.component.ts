import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {DataService} from "./service/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IPManagementFrontend';
  token:any;
  data:any;
  userInfo:any;
  constructor(private router:Router, private service:DataService){}

  ngOnInit(): void {
    this.token = localStorage.getItem('authToken');
  }

  logout(){
    this.userInfo = localStorage.getItem('userInfo');
    this.userInfo = JSON.parse(this.userInfo);
    console.log(this.userInfo);
    this.service.logout(this.userInfo).subscribe(res=>{
      this.data = res;
      if (this.data.success === true){
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');
        this.router.navigate(['login']);
      }
    });
  }
}
