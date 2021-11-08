import { Component, OnInit } from '@angular/core';
import {DataService} from "../service/data.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  datas:any;
  closeResult = '';
  form:any;
  submitted= false;
  data:any;
  userInfo:any;

  constructor(private service:DataService, private modalService: NgbModal, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getIpInfo();
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      ip:[null, Validators.required],
      description:[null, Validators.required],
    })
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;
    if (this.form.invalid){
      return;
    }
    this.form.value.userId=this.userInfo.userId;
    this.service.submitIPData(this.form.value).subscribe(res=>{
      this.data = res;
      this.modalService.dismissAll();
      this.getIpInfo();
      if (this.data.success === true){
        this.showSuccess(JSON.stringify(this.data.message), "Success");
      }else {
        this.showSuccess(JSON.stringify(this.data.message), "Error");
      }
      this.submitted = false;
      this.form.get('userId').reset();
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

  getIpInfo(){
    this.userInfo = localStorage.getItem('userInfo');
    this.userInfo = JSON.parse(this.userInfo);
    this.service.getIpInfos().subscribe(res=>{
      this.datas = res;
    });
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.submitted = true;
    if (this.form.invalid){
      return "test";
    }
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
