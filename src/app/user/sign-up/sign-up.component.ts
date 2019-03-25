import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from "@angular/forms";
import { ToasterService } from 'src/app/commonServices/toaster.service';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  showLoader: boolean = false;
  constructor( private toasterServices: ToasterService,
  private userServices: UserService,
  private Router: Router) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
    "firstName": new FormControl("",{validators:[Validators.required,Validators.pattern("[a-zA-z]{1,10}$")],updateOn: 'blur'}),
    "lastName": new FormControl("",{validators:[Validators.pattern("[a-zA-z]{1,10}$")],updateOn: 'blur'}),
    "email": new FormControl("",{validators:[Validators.email,Validators.required],updateOn: 'blur'}),
    "contactNumber": new FormControl("",{validators:[Validators.required,Validators.pattern("[0-9]{10}$")],updateOn: 'blur'}),
    "department": new FormControl("Administrative"),
    "password": new FormControl("",{validators:[Validators.required,Validators.pattern("[a-zA-z0-9]{6,10}$")],updateOn: 'blur'}),
    "confPassword": new FormControl("",{validators:[Validators.required,Validators.pattern("[a-zA-z0-9]{6,10}$")],updateOn: 'blur'})      
  })
  }

  signUp(signUpForm){
    console.log(this.signUpForm);
    
    if (signUpForm.status !== "INVALID") {
      this.userServices.signUp(this.signUpForm.value)
      .subscribe(res => {
        this.Router.navigate(["login"]);
        this.toasterServices.success("New user has been created successfully", "Success");  
      },error =>{
        console.log(error.errors);
        
      this.toasterServices.error("Unexpected error Occured at  server.", "Error");      
      });
     } else {
      this.toasterServices.error("Please fill mandatory fields correctly", "Error");      
    }
  }

  validateConfPass(){
    console.log("in valP",this.signUpForm.get('password').value === this.signUpForm.get('confPassword').value);
    
    return this.signUpForm.get('password').value === this.signUpForm.get('confPassword').value;
  }

}
