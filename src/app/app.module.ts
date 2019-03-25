import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router'


import { HomeModule } from './home/home.module'; 
import { UserModule } from './user/user.module'; 

import {AngularMaterialModule } from './angular-material/angular-material.module';

import { ToasterService } from './commonServices/toaster.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentModule } from './student/student.module';
import { AuthGuard } from './commonServices/auth-guard.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    UserModule,
    AngularMaterialModule,
    StudentModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
  ])
  ],
  providers: [ToasterService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
