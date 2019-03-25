import { Component, OnInit } from '@angular/core';
import  { FormGroup,FormControl,Validators } from "@angular/forms";
import { ToasterService } from '../../commonServices/toaster.service';
import { Router } from '@angular/router';

import { UserService } from '../user.service';



import { IUser } from "../../models/login-user"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
showLoader: boolean = false;
  constructor(private toasterServices: ToasterService,
  private userServices: UserService,
  private router: Router
  ) { 
    
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl("",{validators:[Validators.email,Validators.required],updateOn: 'blur'}),
      'password': new FormControl("",{validators:[Validators.required,Validators.pattern("[a-zA-z0-9]{6,10}$")],updateOn: 'blur'})
    });
  }

  login(){
    if (this.loginForm.status !== "INVALID") {
      this.showLoader = true;
  this.userServices.login(this.loginForm.value)
  .subscribe(response =>{
    this.showLoader = false;
    localStorage.setItem("currentUser",JSON.stringify(response));
    this.toasterServices.success("Logeed in successful","Success");
    this.router.navigate(['/home']);
  },
  (error: any) => {
    console.log(error);
        this.showLoader = false;
    this.toasterServices.error("Unexpected error occured","Error");   
  });
    } else {
      this.toasterServices.error("Please fill mandatory fields correctly", "Error");      
    }
}
}
