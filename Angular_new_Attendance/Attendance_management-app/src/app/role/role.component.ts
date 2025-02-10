import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Role {
  id: number;
  roleName: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-role',
  imports: [FormsModule,CommonModule],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  roles: Role[] = [];
  newRoleName: string = '';

  private apiUrl = 'https://localhost:7171/api/role'; // Change to your API URL

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.http.get<Role[]>(this.apiUrl).subscribe((data) => {
      this.roles = data;
    });
  }

  addRole(): void {
    const newRole: Partial<Role> = { roleName: this.newRoleName };
    this.http.post<Role>(this.apiUrl, newRole).subscribe((role) => {
      this.roles.push(role);
      this.newRoleName = ''; // Clear the input after adding
    });
  }

  deleteRole(roleId: number): void {
    this.http.delete(`${this.apiUrl}/${roleId}`).subscribe(() => {
      this.roles = this.roles.filter(role => role.id !== roleId);
    });
  }
}