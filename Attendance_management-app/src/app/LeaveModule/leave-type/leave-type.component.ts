import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DbservicesService } from '../../services/db/dbservices.service';

@Component({
  selector: 'app-leave-type',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './leave-type.component.html',
  styleUrl: './leave-type.component.css',
})
export class LeaveTypeComponent implements OnInit {
  leaveTypes: any[] = [];
  leaveForm!: FormGroup;
  showLeaveForm = false;
  isEditing = false;
  selectedLeaveType: any = {};
  changingId:any;


  constructor(private fb: FormBuilder, private dbService: DbservicesService) {}

  ngOnInit() {
    this.initializeForm();
    this.loadLeaveTypes();
  }

  initializeForm() {
    this.leaveForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  loadLeaveTypes() {
    console.log('Loading Leave Types...');
    this.dbService.getRecord('LeaveTypes').subscribe(
      (data: any) => {
        this.leaveTypes = data.map((leave: any) => ({
          ...leave,
          created_at: new Date(leave.createdAt),
          updated_at: new Date(leave.updatedAt),
        }));
        console.log(data);
      },
      (error:any) => console.error('Error fetching leave types', error)
    );
  }

  saveLeaveType() {
    this.selectedLeaveType = this.leaveForm.value;
    if (this.isEditing) {
      this.dbService.updateRecord(`LeaveTypes/${this.changingId}`, this.selectedLeaveType)
        .subscribe(
          () => {
            alert('Leave Type updated successfully!');
            this.loadLeaveTypes();
          },
          (error: any) => console.error('Error updating leave type', error)
        );
    } else {
      this.dbService.postRecord('LeaveTypes', this.selectedLeaveType)
        .subscribe(
          () =>{
            alert('Leave Type added successfully!');
            this.loadLeaveTypes();
          },
          (error:any) => console.error('Error adding leave type', error)
        );
    }
    this.cancelEdit();
  }

  editLeaveType(leaveType: any) {
    this.isEditing = true;
    this.selectedLeaveType = { ...leaveType };

    this.leaveForm.patchValue({
      name: leaveType.name,
      description: leaveType.description
    });
    this.changingId = leaveType.id;
  }

  deleteLeaveType(id: number) {
    if (confirm('Are you sure you want to delete this leave type?')) {
      this.dbService.deleteRecord(`LeaveTypes/${id}`)
        .subscribe(
          () => {
            alert('Leave Type deleted successfully!');
            this.loadLeaveTypes();
          },
          (error:any) => console.error('Error deleting leave type', error)
        );
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedLeaveType = {};
    this.leaveForm.reset();
  }
}
