import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../angular-material/angular-material.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent},
    ])
  ]
})
export class HomeModule { }
