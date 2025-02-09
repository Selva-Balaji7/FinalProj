import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/user/user.state';
import { Router } from '@angular/router';
import { saveUserData } from '../../../store/user/user.actions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbservicesService } from '../../services/db/dbservices.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance-history',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './attendance-history.component.html',
  styleUrl: './attendance-history.component.css'
})
export class AttendanceHistoryComponent {

  private userstore = inject(Store<{user:UserState}>)
    public user:any;
  
    showStudents:boolean = false;
    showTeachers:boolean = false;
    page:number = 1;
    filterForm:any;
    startDate:string = "";
    endDate:string = "";
    status:string = "";
    attendances:any = [];
  
    constructor(private _route:Router, private _http:DbservicesService){}
  
    ngOnInit(){
      this.userstore.select(state => state.user).subscribe(date => this.user=date);

      if(!this.user.permissions.includes("AttendanceHistory"))
        this._route.navigate(['/']);
      else
        this.getAttendanceDetails();
      
      this.filterForm = new FormGroup({
        startDate:new FormControl("", [Validators.required]),
        endDate:new FormControl("", [Validators.required]),
        status: new FormControl("", [Validators.required])
      })
      
    }
  
    
  
    getAttendanceDetails(){
      console.log("Trying to get details");
      var reqUrl:string = `Attendance/${this.user.id}/limit/${this.page}`;
  
      if(this.startDate && this.endDate)
        reqUrl += `?startDate=${this.startDate}&endDate=${this.endDate}`;
      else
      reqUrl += `?startDate=null&endDate=null`;
  
      
      reqUrl += `&role=${this.user.role}`
  
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
      this.page = 1;
  
      if((this.startDate && !this.startDate) || (!this.startDate && this.startDate))  
        window.alert("Both Dates are required");
      
        
      this.getAttendanceDetails();
    }

}
