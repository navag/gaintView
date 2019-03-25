import { Component, OnInit,ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import {Router } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';




export interface StudentData {
  rollNo: string;
  name: string;
  degree: string;
  city: string;
  admDate: Date;
}
 

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['rollNo', 'name', 'degree', 'city','admDate','actions'];
  dataSource: MatTableDataSource<StudentData>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( public studentService: StudentService,
    private router: Router) {
      this.studentService.getStudentList()
      .subscribe(
        res=> {
          const studentRes = res["students"];
          console.log(studentRes);
          this.dataSource = new MatTableDataSource(studentRes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error=>{
          console.log(error);
          
        }
      )
        console.log(this.dataSource);
        
   }


  ngOnInit() {
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  edit(student){
    if (student) {
      this.router.navigate(["edit-student",student._id]);
    } else {
      this.router.navigate(["add-student"]);
    }
  } 
}
