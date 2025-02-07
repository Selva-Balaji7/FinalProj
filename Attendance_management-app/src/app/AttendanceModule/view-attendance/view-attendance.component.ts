import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicesService } from '../../services/db/dbservices.service';

@Component({
  selector: 'app-view-attendance',
  imports: [],
  templateUrl: './view-attendance.component.html',
  styleUrl: './view-attendance.component.css'
})
export class ViewAttendanceComponent {

  user:any = {id:100, name:"William", email:"william@gmail.com",role:"student", permisssions:["","",""]}
  page:number = 1;
  startDate:string = "";
  endDate:string = "";
  attendances:any = [];

  constructor(private _route:Router, private _http:DbservicesService){}

  ngOnInit(){
    if(this.user.role === "admin" || this.user.role === null){
      this._route.navigate(['/']);
    }
    
    this.getAttendanceDetails();
  }

  getAttendanceDetails(){
    console.log("Trying to get details");
    var reqUrl:string = "";

    if(this.startDate && this.endDate)
      reqUrl= `Attendance/${this.user.id}/limit/${this.page}?startDate=${this.startDate}&endDate=${this.endDate}`;
    else
      reqUrl = `Attendance/${this.user.id}/limit/${this.page}?startDate=null&endDate=null`;

    console.log(reqUrl);
    this._http.getRecord(reqUrl).subscribe(
      (res) => {this.attendances=res;console.log(this.attendances);},
      (error) => {console.log(error)}
    )
  }


  changePage(count:number){
    var tempPage:number = this.page;
    tempPage += count;
    if(tempPage > 0 ){
      this.page = tempPage;
      this.getAttendanceDetails();
      if(this.attendances.length == 0){
        this.page-=count;
      }
    }
  }


}
