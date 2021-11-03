import { Injectable} from "@angular/core";
import { CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router:Router){}

  token:any;
  canActivate():any {
    this.token = localStorage.getItem('authToken');
    if (this.token){
      return true;
    }else {
      this.router.navigate(['login'])
    }
  }
}
