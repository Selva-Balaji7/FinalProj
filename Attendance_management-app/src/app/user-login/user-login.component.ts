import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbservicesService } from '../services/db.service';


@Component({
  selector: 'app-user-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  LData:any;
  reqUrl:any;

  constructor(private _http : DbservicesService, private _route:Router){}

  AuthenticateUser(LoginForm:any){
    this.LData = LoginForm.value;
    this.reqUrl = `UserLogin/${LoginForm.value.userid}/verify?password=${LoginForm.value.userpassword}`;

    this._http.getRecord(this.reqUrl).subscribe(
      (res)=>{
        if(res){
          window.alert("Logged in");
        }
        else{
          window.alert("Wrong Password");
        }
      },
      (error)=>{
        window.alert(error.error);
      }
    )
    console.log(this.reqUrl);

  }
  
}