import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/user/user.state';
import { Router } from '@angular/router';
import { saveUserData } from '../../../store/user/user.actions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbservicesService } from '../../services/db/dbservices.service';
import { CommonModule } from '@angular/common';
import { addMessage } from '../../../common/popupmessage';

@Component({
  selector: 'app-attendance-history',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './attendance-history.component.html',
  styleUrl: './attendance-history.component.css'
})
export class AttendanceHistoryComponent {

  private userstore = inject(Store<{user:UserState}>)
    public user:any;
    Statuses:any;
    UpdateStatuses:any = [];
  
    page:number = 1;
    filterForm:any;
    startDate:string = "";
    endDate:string = "";
    status:string = "";
    attendances:any = [];
    
    canEditAttendance:boolean = false;
    public isEditingId:number = -1;
    editAttendanceForm:any;
  
    constructor(private _route:Router, private _http:DbservicesService){}
  
    ngOnInit(){
      this.userstore.select(state => state.user).subscribe(data => this.user=data);

      if(!this.user.permissions.includes("AttendanceHistory")){
        addMessage({type:"warning", message:"Access Denied"});
        this._route.navigate(['/']);
      }
      else
        this.getAttendanceDetails();

      if(this.user.permissions.includes("EditAttendance"))
        this.canEditAttendance = true;
  
  
      this.filterForm = new FormGroup({
        startDate:new FormControl("", [Validators.required]),
        endDate:new FormControl("", [Validators.required]),
        status: new FormControl("", [Validators.required]),
      });

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
          addMessage({type:"failure", message:"Error Getting Data From Server"});
        }
      )
      
    }
  
    
  
    getAttendanceDetails(){
        var reqUrl:string = `Attendance/${this.user.id}/limit/${this.page}`;
      
      if(this.startDate && this.endDate)
        reqUrl += `?startDate=${this.startDate}&endDate=${this.endDate}`;
      else
        reqUrl += `?startDate=null&endDate=null`;
    
      if(this.status)
        reqUrl += `&status=${this.status}`
      else
        reqUrl += `&status=null`
  
      this._http.getRecord(reqUrl).subscribe(
        (res) => {this.attendances=res;console.log(res);},
        (error) => {addMessage({type:"failure", message:"Error Getting Data From Server"});}
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
      this.startDate = this.filterForm.value.startDate;
      this.endDate = this.filterForm.value.endDate;
      this.status = this.filterForm.value.status;
      this.page = 1;
  
      if((this.startDate && !this.startDate) || (!this.startDate && this.startDate))  
        addMessage({type:"warning", message:"Both Dates Are Required"});
        
      this.getAttendanceDetails();
    }

    editStatusof(attendance:any){
      this.isEditingId = attendance.id;

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
        (res)=>{
          addMessage({type:"success", message:"Attendance Updated"});
          this.getAttendanceDetails();
          this.isEditingId=-1
        },
        (error)=>{
          addMessage({type:"failure", message:"Unable to Update"});
          this.isEditingId=-1
        }
      )
    }
    
    deleteStatusof(attendance:any){
      this._http.deleteRecord(`attendance/${attendance.id}`).subscribe(
        (res)=>{
          addMessage({type:"success", message:"Attendance Deleted"});
          this.getAttendanceDetails();
        },
        (error)=>{
          addMessage({type:"failure", message:"Unable to Delete"});
        }
      )
    }




}
