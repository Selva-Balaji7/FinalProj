// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class DbServiceService {

//   private apiUrl="https://localhost:7171/api";

//   constructor() {private http: HttpClient }

//   getAttendanceRequests(role: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/byrole?role=${role}`);
//   }

// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceRequestService {
  private apiUrl = 'http://localhost:7171/api/attendancerequest'; // Adjust URL based on your backend

  constructor(private http: HttpClient) {}

  getAttendanceRequests(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/byrole?role=${role}`);
  }
}