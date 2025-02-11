import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface Role {
  id: number;
  roleName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: 'app-role',
  imports: [FormsModule, CommonModule],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  roles: Role[] = [];
  newRoleName: string = '';
  editingRole: Role | null = null;
  errorMessage: string = '';

  private apiUrl = 'https://localhost:7171/api/role';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.http.get<Role[]>(this.apiUrl).pipe(
      catchError(error => {
        this.errorMessage = 'Failed to load roles.';
        return throwError(() => error);
      })
    ).subscribe(data => this.roles = data);
  }

  addOrUpdateRole(): void {
    if (!this.newRoleName.trim()) {
      this.errorMessage = 'Role name cannot be empty!';
      return;
    }

    if (this.editingRole) {
      this.updateRole();
    } else {
      const newRole: Partial<Role> = { roleName: this.newRoleName };
      this.http.post<Role>(this.apiUrl, newRole).pipe(
        catchError(error => {
          this.errorMessage = 'Failed to add role.';
          return throwError(() => error);
        })
      ).subscribe(role => {
        this.roles.push(role);
        this.resetForm();
      });
    }
  }

  editRole(role: Role): void {
    this.editingRole = { ...role };
    this.newRoleName = role.roleName;
  }

  updateRole(): void {
    if (!this.editingRole) return;

    const updatedRole: Role = { ...this.editingRole, roleName: this.newRoleName };
    this.http.put(`${this.apiUrl}/${updatedRole.id}`, updatedRole).pipe(
      catchError(error => {
        this.errorMessage = 'Failed to update role.';
        return throwError(() => error);
      })
    ).subscribe(() => {
      const index = this.roles.findIndex(r => r.id === updatedRole.id);
      if (index !== -1) {
        this.roles[index] = updatedRole;
      }
      this.resetForm();
    });
  }

  deleteRole(roleId: number): void {
    this.http.delete(`${this.apiUrl}/${roleId}`).pipe(
      catchError(error => {
        this.errorMessage = 'Failed to delete role.';
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.roles = this.roles.filter(role => role.id !== roleId);
    });
  }

  resetForm(): void {
    this.newRoleName = '';
    this.editingRole = null;
    this.errorMessage = '';
  }
}
