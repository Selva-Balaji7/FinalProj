import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { saveUserData } from '../../../store/user/user.actions';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/user/user.state';
import { Router } from '@angular/router';
import { DbservicesService } from '../../services/db/dbservices.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-student-attendance',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './view-student-attendance.component.html',
  styleUrl: './view-student-attendance.component.css'
})
export class ViewStudentAttendanceComponent {

  private userstore = inject(Store<{user:UserState}>)
    public user:any;
    Statuses:any;
    UpdateStatuses:any = [];
  
    page:number = 1;
    filterForm:any;
    startDate:string = "";
    endDate:string = "";
    status:string = "";
    filterid:any="";
    attendances:any = [];

    canEditAttendance:boolean = false;
    public isEditingId:number = -1;
    editAttendanceForm:any;
  
    constructor(private _route:Router, private _http:DbservicesService){}
  
    ngOnInit(){
      this.userstore.select(state => state.user).subscribe(data => this.user=data);
  
      if(!this.user.permissions.includes("ViewStudentAttendance"))
        this._route.navigate(['/']);
      else
        this.getAttendanceDetails();

      if(this.user.permissions.includes("EditAttendance"))
        this.canEditAttendance = true;
  
      this.filterForm = new FormGroup({
        startDate:new FormControl("", [Validators.required]),
        endDate:new FormControl("", [Validators.required]),
        status: new FormControl("", [Validators.required]),
        id: new FormControl("", [Validators.required]),
      })
      this.editAttendanceForm = new FormGroup({
        status:new FormControl("", [Validators.required])
      });

      this._http.getRecord("attendance/GetStatus").subscribe(
        (res)=>{
          this.Statuses = res;
          this.Statuses = ["",...this.Statuses];
          this.UpdateStatuses = res;
        },
        (error) => {
          console.log("Unable to Fetch status");
        }
      )
      
    }
  
    
  
    getAttendanceDetails(){
      console.log("Trying to get details");
      if(this.filterid)
        var reqUrl:string = `Attendance/${this.filterid}/limit/${this.page}`;
      else
        var reqUrl:string = `Attendance/limit/${this.page}`;
      
      if(this.startDate && this.endDate)
        reqUrl += `?startDate=${this.startDate}&endDate=${this.endDate}`;
      else
        reqUrl += `?startDate=null&endDate=null`;
  
      if(!this.filterid)  
        reqUrl += `&role=student`
  
      if(this.status)
        reqUrl += `&status=${this.status}`
      else
        reqUrl += `&status=null`
  
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
      this.status = this.filterForm.value.status;
      this.filterid = this.filterForm.value.id;
      this.page = 1;
  
      if((this.startDate && !this.startDate) || (!this.startDate && this.startDate))  
        window.alert("Both Dates are required");
      
        
      this.getAttendanceDetails();
    }

    editStatusof(attendance:any){
      this.isEditingId = attendance.id;
      console.log("Changing state for ", this.isEditingId);

      this.editAttendanceForm.setValue({
        status:attendance.status
      });
    }

    updateAttendance(attendance:any){
      var updatedAttendance = {
        id:attendance.id,
        userId:attendance.userId,
        date:attendance.date,
        status:this.editAttendanceForm.value.status,
        remarks:attendance.remarks,
        createdAt:attendance.createdAt
      }
      this._http.updateRecord(`attendance/${updatedAttendance.id}`, updatedAttendance).subscribe(
        (res)=>{this.getAttendanceDetails();this.isEditingId=-1},
        (error)=>{console.log(error);}
      )
    }

    deleteStatusof(attendance:any){
      this._http.deleteRecord(`attendance/${attendance.id}`).subscribe(
        (res)=>{this.getAttendanceDetails();},
        (error)=>{console.log(error);}
      )
    }


}
