import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-users',
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-users.component.html',
  styleUrl: './edit-users.component.css'
})
export class EditUsersComponent implements OnInit {
    users: any[] = [];
    showUserForm = false;
    isEditing = false;
    selectedUser: any = {};
    private apiUrl = 'https://localhost:7189/api/editusers';
  
    constructor(private http: HttpClient) {}
  
    ngOnInit() {
      this.loadUsers();
    }
  
    loadUsers() {
      console.log('loadUsers');
      this.http.get<any[]>(this.apiUrl).subscribe((data) => {
        this.users = data.map(user => ({
          ...user,
          created_at: new Date(user.created_at),   // Convert to Date object
          updated_at: new Date(user.updated_at)
        }));
       console.log(data);
      });
  }
  
    openUserForm(user: any = {}) {
      this.selectedUser = { ...user };
      this.isEditing = !!user.id;
      this.showUserForm = true;
    }
  
    closeUserForm() {
      this.showUserForm = false;
      this.selectedUser = {};

    }
  
    saveUser() {
        const currentTime = new Date().toISOString();
        
        if (!this.selectedUser.created_at) {
          this.selectedUser.created_at = currentTime; // Set only if it's a new user
        }
        this.selectedUser.updated_at = currentTime; // Always update
      
        if (this.isEditing) {
          this.http.put(`${this.apiUrl}/${this.selectedUser.id}`, this.selectedUser)
            .subscribe(() => {
              this.loadUsers();
            });
        } else {
          this.http.post(this.apiUrl, this.selectedUser)
            .subscribe(() => {
              this.loadUsers();
            });
        }
      
        this.closeUserForm();
      }

      deleteUser(id: number) {
        if (confirm('Are you sure you want to delete this user?')) {
          this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.loadUsers());
        }
      }
      
  }
  
   
  
  


