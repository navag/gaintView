import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list/student-list.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { RouterModule } from '@angular/router';
import { StudentService } from './student.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthGuard } from '../commonServices/auth-guard.service';

@NgModule({
  declarations: [StudentListComponent, AddStudentComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
      path:'student-list', component:StudentListComponent, canActivate:[AuthGuard]
    },
    {
      path:'add-student', component:AddStudentComponent, canActivate:[AuthGuard]
    },
    {
      path:'edit-student/:id', component:AddStudentComponent, canActivate:[AuthGuard]
    }
  ])
  ],
  providers:[StudentService,AuthGuard]
})
export class StudentModule { }
