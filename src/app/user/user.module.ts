import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"




import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoaderComponent } from '../common-comp/loader/loader.component';


import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [LoginComponent,
   SignUpComponent,
   LoaderComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {path:"sign-up",component:SignUpComponent}
      ])
      ]
})
export class UserModule { }
