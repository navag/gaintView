import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }else{
      return false;
    }
  }

  isAdmin(){
  let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user.isAdmin) {
      return true;
    }else{
      return false;
    }
  }
}
