import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router";
import {DataService} from "../service/data.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-ip',
  templateUrl: './update-ip.component.html',
  styleUrls: ['./update-ip.component.css']
})
export class UpdateIpComponent implements OnInit {
  id:any;
  data:any;
  form:any;
  submitted= false;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private service:DataService, private toastr: ToastrService,  private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getIPInfoById();
    this.createForm();
  }
  createForm(){
    this.form = this.formBuilder.group({
      id:[null],
      ip:[null, Validators.required],
      description:[null, Validators.required],
    })
  }
  get f(){
    return this.form.controls;
  }
  getIPInfoById(){
    this.service.getIPInfoById(this.id).subscribe(res=>{
      this.data = res;
    });
  }
  submit(){
    this.submitted = true;
    if (this.form.invalid){
      return;
    }
    this.service.updateIPData(this.form.value).subscribe(res=>{
      this.data = res;
      this.router.navigate(['/']);
      if (this.data.success === true){
        this.showSuccess(JSON.stringify(this.data.message), "Success");
      }else {
        this.showSuccess(JSON.stringify(this.data.message), "Error");
      }
      this.submitted = false;
      this.form.get('id').reset();
      this.form.get('ip').reset();
      this.form.get('description').reset();
    });
  }
  showSuccess(message:any, title:any) {
    this.toastr.success(message, title,{
      progressBar:true,
      timeOut:5000
    });
  }
}
