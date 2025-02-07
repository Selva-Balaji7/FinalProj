import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbservicesService {
    baseURL:string="https://localhost:7189/api";
  
    constructor(private http : HttpClient) { }
  
    postRecord(tableName:any, val:any){
      return this.http.post(`${this.baseURL}/${tableName}`, val);
    }
    getRecord(tableName:any){
      return this.http.get(`${this.baseURL}/${tableName}`);
    }
  
  }

