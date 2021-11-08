import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AuthGuard } from "./auth.guard";
import {IplogsComponent} from "./iplogs/iplogs.component";
import {UpdateIpComponent} from "./update-ip/update-ip.component";

const routes: Routes = [
  {
    component:DashboardComponent,
    path:'',
    canActivate:[AuthGuard]
  },
  {
    component:IplogsComponent,
    path:'ip-logs',
    canActivate:[AuthGuard]
  },
  {
    component:LoginComponent,
    path:'login'
  },
  {
    component:RegisterComponent,
    path:'register',
    canActivate:[AuthGuard]
  },
  {
    component:UpdateIpComponent,
    path:'update-ip/:id',
    canActivate:[AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
