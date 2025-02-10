import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DbservicesService {

  constructor(private http: HttpClient) { }


  private apiUrl1 = 'https://localhost:7032/api';

  getRequests(table: string) {
    return this.http.get<any[]>(`${this.apiUrl1}/${table}`);

  }

  
  postRecord(tableName:any, val:any){
    return this.http.post(`${this.apiUrl1}/${tableName}`, val);
  }



}
