import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DataService } from "../service/data.service";
import { ToastrService } from 'ngx-toastr';
import { Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:any;
  submitted= false;
  data:any;
  userInfo:any={};
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private service:DataService, private router:Router) { }

  createForm(){
    this.form = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]]
    })
  }
  ngOnInit(): void {
    this.createForm();
  }
  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;
    if (this.form.invalid){
      return;
    }
    this.service.loginUser(this.form.value).subscribe(res=>{
      console.log(res);
      this.data = res;
      if (this.data.success === true){
        this.userInfo = {
          name:this.data.data.name,
          email:this.data.data.email,
          userId:this.data.data.userId
        };
        localStorage.setItem('authToken', this.data.data.accessToken);
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        this.router.navigate(['/']);
        this.toastr.success("Login successfully", "Success",{
          progressBar:true,
          timeOut:5000
        });
      }else {
        this.toastr.error("User email and password don't match", "Error",{
          progressBar:true,
          timeOut:5000
        });
      }
      this.submitted = false;
      this.form.get('email').reset();
      this.form.get('password').reset();
    });
  }

}
