import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DataService } from "../service/data.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:any;
  submitted= false;
  data:any;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private service:DataService) { }

  createForm(){
    this.form = this.formBuilder.group({
      name:[null, Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      confirm_password:['', Validators.required]
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
    this.service.registerUser(this.form.value).subscribe(res=>{
      this.data = res;
      if (this.data.success === true){
        this.showSuccess(JSON.stringify(this.data.message), "Success");
      }else {
        this.showSuccess(JSON.stringify(this.data.message), "Error");
      }
      this.submitted = false;
      this.form.get('name').reset();
      this.form.get('email').reset();
      this.form.get('password').reset();
      this.form.get('confirm_password').reset();
    });
  }
  showSuccess(message:any, title:any) {
    console.log(message);
    this.toastr.success(message, title,{
      progressBar:true,
      timeOut:5000
    });
  }

}
