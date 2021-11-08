import { Component, OnInit } from '@angular/core';
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-iplogs',
  templateUrl: './iplogs.component.html',
  styleUrls: ['./iplogs.component.css']
})
export class IplogsComponent implements OnInit {
  datas:any;

  constructor(private service:DataService) { }

  ngOnInit(): void {
    this.getIpInfo();
  }

  getIpInfo(){
    this.service.getIpLogs().subscribe(res=>{
      this.datas = res;
    });
  }

}
