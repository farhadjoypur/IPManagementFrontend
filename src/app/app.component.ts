import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IPManagementFrontend';
  token:any;
  constructor(private router:Router){}

  ngOnInit(): void {
    this.token = localStorage.getItem('authToken');
  }

  logout(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    this.router.navigate(['login']);
  }
}
