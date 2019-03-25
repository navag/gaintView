import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor( private http:HttpClient) { }
   user = JSON.parse(localStorage.getItem('currentUser'));

  getStudentList() {   
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    headers.append('Authorization', "Bearer " + this.user.token);
    return  this.http.get("http://localhost:3000/students",{headers: headers});
  }

  getSpecificStudent(id) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    headers.append('Authorization', "Bearer " + this.user.token);
    return  this.http.get("http://localhost:3000/students/"+id,{headers: headers});
  }

  addStudent(student,id){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    headers.append('Authorization', "Bearer " + this.user.token);
    if (id) {
      return this.http.patch("http://localhost:3000/students/"+id,student,{headers: headers});
    } else {
      return this.http.post("http://localhost:3000/students",student,{headers: headers});      
    }
  }
}

