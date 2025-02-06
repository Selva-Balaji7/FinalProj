import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PermissionComponent } from './permission/permission.component';
import { RoleComponent } from './role/role.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PermissionComponent,RoleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Attendance_management-app';
}
