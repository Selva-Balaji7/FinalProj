import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permission',
  imports: [FormsModule,CommonModule],
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  permissions: any[] = [];  // Using `any` to avoid type issues
  permissionForm: { value: { permissionName: string, roleId: number } } = { value: { permissionName: '', roleId: 2 } }; // Define the permissionForm property

  constructor() { }

  ngOnInit(): void {
    this.getPermissions();  // Get permissions on initialization
  }

  // Simulate getting permissions
  getPermissions(): void {
    this.permissions = [
      { id: 1, name: 'Read' },
      { id: 2, name: 'Write' },
      { id: 3, name: 'Execute' }
    ];
  }

  // Simulate create permission
  createPermission(): void {
    const newPermission = { id: this.permissions.length + 1, name: this.permissionForm.value.permissionName };
    this.permissions.push(newPermission);
    this.permissionForm.value.permissionName = ''; // Clear the input field
  }

  // Simulate update permission
  updatePermission(permission: any): void {
    const index = this.permissions.findIndex(p => p.id === permission.id);
    if (index !== -1) {
      this.permissions[index].name = permission.name;
    }
  }

  // Simulate delete permission
  deletePermission(id: number): void {
    this.permissions = this.permissions.filter(permission => permission.id !== id);
  }
}