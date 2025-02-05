import {HttpClient} from '@angular/common/http';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-type',
  imports: [HttpClient],
  templateUrl: './leave-type.component.html',
  styleUrl: './leave-type.component.css'
})
export class LeaveTypeComponent implements OnInit {
 leaveTypes: any[]=[];

 constructor(private http:HttpClient){}
 ngOnInit(): void {
  this.fetchLeaveTypes();
}

fetchLeaveTypes() {
  this.http.get<any[]>('http://localhost:5000/api/LeaveTypes').subscribe(data => {
    this.leaveTypes = data;
  });
}

}
