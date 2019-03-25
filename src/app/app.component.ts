import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from "./commonServices/auth.service";
import {UserService} from "./user/user.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gaintView';
  constructor(public authService: AuthService,
  private userService: UserService){    
  }
  
}
