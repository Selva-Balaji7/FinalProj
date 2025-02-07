import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbservicesService {

  //constructor() { }

  private baseUrl = 'http://localhost:5000/api/attendance';

  constructor(private http: HttpClient) {}

  submitAttendanceRequest(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submitRequest`, request);
  }

  getAttendanceRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/requests`);
  }

  approveAttendanceRequest(request: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/approve`, request);
  }


}
