import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbservicesService } from '../../services/db/dbservices.service';

@Component({
  selector: 'app-user-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  LData:any;
  reqUrl:any;

  constructor(private http : DbservicesService, private _route:Router){}

  AuthenticateUser(LoginForm:any){
    this.LData = LoginForm.value;
    this.reqUrl = `user/${LoginForm.value.userid}/verify?password=${LoginForm.value.userpassword}`;

    console.log(this.reqUrl);
  }
  
}
