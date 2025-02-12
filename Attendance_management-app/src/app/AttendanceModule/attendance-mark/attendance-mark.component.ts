import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DbservicesService } from '../../services/db/dbservices.service'; 

@Component({
  selector: 'app-attendance-mark',
  imports: [CommonModule,FormsModule],
  templateUrl: './attendance-mark.component.html',
  styleUrl: './attendance-mark.component.css'
})
export class AttendanceMarkComponent  {
  
  attendanceDate:any;  
  userId: number =500;
  status: string ='present';

  constructor(private attendancemark: DbservicesService) {}


  ngOnInit(){
    this.attendancemark.getRecord("User/getDate").subscribe(
      (res:any)=>{this.attendanceDate=res.date;console.log(this.attendanceDate);}
    )
  }


  submitAttendance() {
    if (!this.attendanceDate) {
      alert('Please select a date ');
      return;
    }
  
    
    // let hasAttendanceRequest:any=false;
    // let hasAttendance:any=false;
    // let hasLeaveRequest:any=false;
  
    this.attendancemark.getRecord(`Attendancerequest/check/${this.userId}?date=${this.attendanceDate}`).subscribe(
      (attendanceRequestExists:any) => { 
        if (!attendanceRequestExists) { 
          alert('You already requested attendance for this date.');
          return; 
        }

       
        this.attendancemark.getRecord(`Attendance/check/${this.userId}?date=${this.attendanceDate}`).subscribe(
          (attendanceExists:any) => { 
            if (!attendanceExists) { 
              alert('Attendance is already marked for this date.');
              return; 
            }

            
            this.attendancemark.getRecord(`LeaveRequest/check/${this.userId}?date=${this.attendanceDate}`).subscribe(
              (leaveRequestExists:any) => { 
                if (!leaveRequestExists) { 
                  alert('You already requested leave for this date.');
                  return; 
                }

                
                const attendanceData = {
                  date: this.attendanceDate,
                  userId: this.userId,
                  status: this.status
                };

                this.attendancemark.postRecord(`Attendancerequest`, attendanceData).subscribe({
                  next: () => {
                    alert('Attendance marked successfully!');
                    this.attendanceDate = '';
                  },
                  error: (error: any) => {
                    console.error('Error marking attendance:', error);
                    alert('Failed to mark attendance. Please try again.');
                  }
                });
              },
              (error) => {
                console.error('Error checking leave requests:', error);
                alert('Failed to check existing requests. Please try again later.');
              }
            );
          },
          (error) => {
            console.error('Error checking attendance:', error);
            alert('Failed to check existing requests. Please try again later.');
          }
        );
      },
      (error) => {
        console.error('Error checking attendance requests:', error);
        alert('Failed to check existing requests. Please try again later.');
      }
    );


  }




}


/*


    this.attendancemark.getRequests(`Attendancerequest/check/${this.userId}?date=${this.attendanceDate}`).subscribe(
      
      (attendanceRequestExists) => {
        hasAttendanceRequest = attendanceRequestExists;
       
        this.attendancemark.getRequests(`Attendance/check/${this.userId}?date=${this.attendanceDate}`).subscribe(
          (attendanceExists) => {
            hasAttendance = attendanceExists;
  
            
            this.attendancemark.getRequests(`LeaveRequest/check/${this.userId}?date=${this.attendanceDate}`).subscribe(
              (leaveRequestExists) => {
                hasLeaveRequest = leaveRequestExists;
  
                
                if (hasAttendanceRequest && hasAttendance && hasLeaveRequest) {
                
                  const attendanceData = {
                    date: this.attendanceDate,
                    userId: this.userId,
                    status: this.status
                  };
  
                  this.attendancemark.postRecord(`Attendancerequest`, attendanceData).subscribe({
                    next: () => {
                      alert('Attendance marked successfully!');
                      this.attendanceDate = ''; // Reset the input after submission
                    },
                    error: (error: any) => {
                      console.error('Error marking attendance:', error);
                      alert('Failed to mark attendance. Please try again.');
                    }
                  });
                    } else {
                  
                      alert('You already requested attendance or leave for this date.'); // Alert if any request exists
              
                }
              },
              (error) => {
                console.error('Error checking leave requests:', error);
                alert('Failed to check existing requests. Please try again later.');
              }
            );
          },
          (error) => {
            console.error('Error checking attendance:', error);
            alert('Failed to check existing requests. Please try again later.');
          }
        );
      },
      (error) => {
        console.error('Error checking attendance requests:', error);
        alert('Failed to check existing requests. Please try again later.');
      }
    );



*/