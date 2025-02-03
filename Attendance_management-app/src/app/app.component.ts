import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';

@Component({
  selector: 'app-root',
  imports: [UserLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Attendance_management-app';
}
