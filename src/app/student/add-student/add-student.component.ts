import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from "@angular/forms";
import { ToasterService } from 'src/app/commonServices/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  addForm: FormGroup;
  showLoader: boolean = false;
  studentRes: any;
  id: String;
  constructor( private toasterServices: ToasterService,
  private Router: Router,
  private studentService: StudentService,
  private activatedRoute: ActivatedRoute ) {
    this.addForm = new FormGroup({
      "name": new FormControl("",{validators:[Validators.required,Validators.pattern("[a-zA-z]{1,10}$")],updateOn: 'blur'}),
      "city": new FormControl("",{validators:[Validators.required,Validators.pattern("[a-zA-z]{1,10}$")],updateOn: 'blur'}),
      "degree": new FormControl("",{validators:[Validators.required,Validators.pattern("[a-zA-z]{2}$")],updateOn: 'blur'}),
      "rollNo": new FormControl("",{validators:[Validators.required,Validators.pattern("[0-9]{6}$")],updateOn: 'blur'}),
      "admDate": new FormControl("",{validators:[Validators.required],updateOn: 'blur'}),
    })
   }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      res=> {
    this.id = res.get('id');
      }
      )
      if (this.id) {
        this.studentService.getSpecificStudent(this.id)
    .subscribe(
      res=> {       
        this.addForm.controls['rollNo'].setValue(res['stdent']['rollNo']);
        this.addForm.controls['name'].setValue(res['stdent']['name']);
        this.addForm.controls['degree'].setValue(res['stdent']['degree']);
        this.addForm.controls['city'].setValue(res['stdent']['city']);
        this.addForm.controls['admDate'].setValue(res['stdent']['admDate']);
      },
      error=>{
        console.log(error);
      }
    )  
      }
         
  }

  add(addForm){
      this.studentService.addStudent(addForm,this.id)
    .subscribe(
      res=>{
        if (this.id) {
          this.toasterServices.success("Student added successfully","Success");
        } else {
          this.toasterServices.success("Student added successfully","Success");
        }
        this.Router.navigate(['student-list']);
      },
      err=>{
        this.toasterServices.error("Unexpected Error Occured","Error");
      }
    )
  }

}
