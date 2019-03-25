import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { ToasterService } from '../commonServices/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   constructor(private http: HttpClient, private router: Router, 
    private toasterService: ToasterService ) { }

login(user){
  let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
 return  this.http.post("http://localhost:3000/user/login",JSON.stringify(user),{headers: headers});
}

logOut() {
  localStorage.removeItem('currentUser');
  this.router.navigate(['login']);
  this.toasterService.info('loged out successfully.')
}

signUp(user) {
  let finaluser = user;
  delete finaluser.rePassword;
  console.log(user);  
  let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  return this.http.post("http://localhost:3000/user/signup",finaluser,{headers: headers});
}

deleteUser() {
  let user = JSON.parse(localStorage.getItem('currentUser')).user;
  let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  headers.append('Authorization', "Bearer " + user.token);
 this.http.delete("http://localhost:3000/user/"+user._id,{headers: headers})
 .subscribe(
   res => {
     this.toasterService.success("user deleted successfully","Sucess");
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
   },error => {
    this.toasterService.error("Unexpected Error Occured","Error");
  }
 );
}
}
