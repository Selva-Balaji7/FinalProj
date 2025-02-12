import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DbservicesService } from '../../services/db/dbservices.service';

@Component({
  selector: 'app-edit-users',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './edit-users.component.html',
  styleUrl: './edit-users.component.css'
})
export class EditUsersComponent implements OnInit {
    users:any;
    addUserForm:any;
    showUserForm = false;
    showAddUserForm = false;
    isEditing = false;
    selectedUser: any = {};
  
    constructor(public http: DbservicesService) {}
  
    ngOnInit() {
      this.loadUsers();
      this.addUserForm  = new FormGroup({
        id: new FormControl("",[Validators.required]),
        name: new FormControl("",[Validators.required]),
        email: new FormControl("",[Validators.required]),
        password: new FormControl("",[Validators.required]),
        role:new FormControl("",[Validators.required]),
      })
    }
  
    loadUsers() {
      console.log('loadUsers');
      this.http.getRecord("User").subscribe((data) => {
        this.users = data
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

    openAddUserForm() {
      this.isEditing = false;
      this.showUserForm = false;
      this.showAddUserForm=true
    }
    
    closeAddUserForm() {
      this.showAddUserForm=false
    }
  
    saveUser() {
        const currentTime = new Date().toISOString();
        
        // if (!this.selectedUser.created_at) {
        //   this.selectedUser.created_at = currentTime; // Set only if it's a new user
        // }
        // this.selectedUser.updated_at = currentTime; // Always update
      
        if (this.isEditing) {
          this.http.updateRecord(`User/${this.selectedUser.id}`, this.selectedUser)
            .subscribe(() => {
              this.loadUsers();
            });
        } else {
          this.http.postRecord("User", this.selectedUser)
            .subscribe(() => {
              this.loadUsers();
            });
        }
      
        this.closeUserForm();
      }

      addUser(){

      }


      deleteUser(id: number) {
        if (confirm('Are you sure you want to delete this user?')) {
          this.http.deleteRecord(`User/${id}`).subscribe(() => this.loadUsers());
        }
      }
      
  }
  
   
  
  


