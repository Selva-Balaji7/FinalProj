import { Injectable, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Permission {
  id: number;
  name: string;
  roleId: number;  // ✅ Added roleId
}

interface CreatePermissionRequest {
  permissionName: string;
  roleId: number;
}

interface UpdatePermissionRequest {
  id: number;
  name: string;
  roleId: number;  // ✅ Added roleId for updates
}

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  permissions: Permission[] = [];
  permissionForm: CreatePermissionRequest = {
    permissionName: '',
    roleId: 2
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPermissions();
  }

  getPermissions(): void {
    this.http.get<Permission[]>('https://localhost:7171/api/Permission')
      .subscribe(
        (data) => {
          console.log(data);
          this.permissions = data;
        },
        (error) => {
          console.error('Error fetching permissions: ', error);
        }
      );
  }

  createPermission(): void {
    const newPermission: CreatePermissionRequest = {
      permissionName: this.permissionForm.permissionName,
      roleId: this.permissionForm.roleId
    };

    this.http.post('https://localhost:7171/api/Permission', newPermission, this.httpOptions)
      .subscribe(
        (data) => {
          console.log('New permission created: ', data);
          this.getPermissions();
          this.permissionForm.permissionName = '';
        },
        (error) => {
          console.error('Error creating permission: ', error);
        }
      );
  }

  updatePermission(permission: Permission): void {
    if (permission) {
      const updatePermissionRequest: UpdatePermissionRequest = {
        name: permission.name,
        id: permission.id,
        roleId: permission.roleId  // ✅ Added roleId to update request
      };

      this.http.put(`https://localhost:7171/api/Permission/${permission.id}`, updatePermissionRequest, this.httpOptions)  // ✅ Fixed URL
        .subscribe(
          (data) => {
            console.log('Permission updated: ', data);
            this.getPermissions();
          },
          (error) => {
            console.error('Error updating permission: ', error);
          }
        );
    }
  }

  deletePermission(id: number): void {
    this.http.delete(`https://localhost:7171/api/Permission/${id}`, this.httpOptions)
      .subscribe(
        () => {
          console.log('Permission deleted');
          this.getPermissions();
        },
        (error) => {
          console.error('Error deleting permission: ', error);
        }
      );
  }
}
