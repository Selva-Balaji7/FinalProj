import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/user/user.state';
import { Router } from '@angular/router';
import { DbservicesService } from '../../services/db/dbservices.service';
import { saveUserData } from '../../../store/user/user.actions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-all-attendance',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-all-attendance.component.html',
  styleUrl: './view-all-attendance.component.css'
})
export class ViewAllAttendanceComponent {
  private userstore = inject(Store<{user:UserState}>)
    public user:any;
  
    page:number = 1;
    filterForm:any;
    startDate:string = "";
    endDate:string = "";
    status:string = "";
    attendances:any = [];
  
    constructor(private _route:Router, private _http:DbservicesService){}
  
    ngOnInit(){
      this.userstore.select(state => state.user).subscribe(data => this.user=data);
      if(!this.user.id){
          var localuser:any = localStorage.getItem('user');
              if(!!localuser){
              this.userstore.dispatch(saveUserData(JSON.parse(localuser)));
              }
          else{
              this._route.navigate(['/']);
          }
      }
  
      if(!this.user.permissions.includes("AttendanceHistory"))
        this._route.navigate(['/']);
  
      this.filterForm = new FormGroup({
        startDate:new FormControl("", [Validators.required]),
        endDate:new FormControl("", [Validators.required]),
        status: new FormControl("", [Validators.required])
      })
      
      this.getAttendanceDetails();
    }
  
    
  
    getAttendanceDetails(){
      console.log("Trying to get details");
      var reqUrl:string = `Attendance/limit/${this.page}`;
      
      if(this.startDate && this.endDate)
        reqUrl += `?startDate=${this.startDate}&endDate=${this.endDate}`;
      else
      reqUrl += `?startDate=null&endDate=null`;
  
      reqUrl += `&role=null`
  
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
