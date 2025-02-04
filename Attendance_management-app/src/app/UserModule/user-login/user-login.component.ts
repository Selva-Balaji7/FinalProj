import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  LData:any;

  AuthenticateUser(LoginForm:any){
    this.LData = LoginForm.value;
    console.log(this.LData);
  }
  
}
