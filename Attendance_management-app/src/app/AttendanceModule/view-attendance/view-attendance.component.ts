import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicesService } from '../../services/db/dbservices.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-attendance',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './view-attendance.component.html',
  styleUrl: './view-attendance.component.css'
})
export class ViewAttendanceComponent {

  user:any = {id:500, name:"William", email:"william@gmail.com",role:"admin", permisssions:["","",""]};
  showStudents:boolean = false;
  showTeachers:boolean = false;
  page:number = 1;
  filterForm:any;
  startDate:string = "";
  endDate:string = "";
  attendances:any = [];

  constructor(private _route:Router, private _http:DbservicesService){}

  ngOnInit(){
    if(this.user.role === null){
      this._route.navigate(['/']);
    }
    this.filterForm = new FormGroup({
      startDate:new FormControl("", [Validators.required]),
      endDate:new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required])
    })
    
    this.getAttendanceDetails();
  }

  

  getAttendanceDetails(){
    console.log("Trying to get details");
    var reqUrl:string = "Attendance/";

    if(this.user.role == "student" || (this.user.role == "teacher" && !this.showStudents))
      reqUrl += `${this.user.id}/limit/${this.page}`

    if(this.user.role == "admin" && !this.showTeachers && !this.showStudents)
      reqUrl += `limit/${this.page}`
    
    if(this.showStudents)
      reqUrl += `role/student/${this.page}`
    if(this.showTeachers)
      reqUrl += `role/teacher/${this.page}`

    if(this.startDate && this.endDate)
      reqUrl += `?startDate=${this.startDate}&endDate=${this.endDate}`;
    else
      reqUrl += `?startDate=null&endDate=null`;

    console.log(reqUrl);
    this._http.getRecord(reqUrl).subscribe(
      (res) => {this.attendances=res;console.log(this.attendances);},
      (error) => {console.log(error)}
    )
  }

  reset(){
    this.page = 1;
    this.getAttendanceDetails();
  }
  prevPage(count:number){
    if(this.page > 1){
      this.page-=count;
      this.getAttendanceDetails();
    }
    return;
  }

  nextPage(count:number){
    if(this.attendances.length == 10){
      this.page += count;
      this.getAttendanceDetails();
    }
    return;
  }

  setFiler(){
    console.log(this.filterForm.value);
    this.startDate = this.filterForm.value.startDate;
    this.endDate = this.filterForm.value.endDate;

    if(this.startDate && this.endDate)
      this.getAttendanceDetails();
    else
      window.alert("require Both dates");

  }


  changeToStudents(){
    this.showStudents = true;
    this.showTeachers = false;

    this.getAttendanceDetails();
  }
  changeToTeachers(){
    this.showStudents = false;
    this.showTeachers = true;

    this.getAttendanceDetails();
  }
  changeToYours(){
    this.showStudents = false;
    this.showTeachers = false;

    this.getAttendanceDetails();
  }


}
