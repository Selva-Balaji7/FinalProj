import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-login',
  imports: [CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  myStyle1={
    postion:'absolute',
    left:'50%',
    top:'50%',
    border:'1px solid black',
    translate:'-50% -50%'
  }

}
