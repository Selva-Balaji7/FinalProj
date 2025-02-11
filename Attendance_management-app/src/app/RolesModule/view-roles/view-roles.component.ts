import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/user/user.state';
import { Router } from '@angular/router';
import { DbservicesService } from '../../services/db/dbservices.service';
import { saveUserData } from '../../../store/user/user.actions';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {PermissionList} from '../../../common/commondate'

@Component({
  selector: 'app-view-roles',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './view-roles.component.html',
  styleUrl: './view-roles.component.css'
})
export class ViewRolesComponent {

  private userstore = inject(Store<{user:UserState}>)
  public user:any;  
  Roles:any = [];
  CanEdit:any = false;
  editingValueForId:any = -1;
  editingValueForName:any = "";
  roleEditForm:any;
  addpermissionforID:any;
  PermissionList:any = PermissionList;
  isAddingNewRole:boolean = false;

  constructor(private _route:Router, private _http:DbservicesService){}

  ngOnInit(){
    this.userstore.select(state => state.user).subscribe(data => this.user=data);
    
    if(this.user.permissions.includes("EditRoles")){
      this.CanEdit = true;
    } 

    if(!this.user.permissions.includes("ViewRoles"))
      this._route.navigate(['/']);
    else
      this.getRoles();
    
    this.roleEditForm = new FormGroup({
      roleId : new FormControl("", [Validators.required]),
      roleName : new FormControl("", [Validators.required])
    });
    
  }


  getRoles(){
    this._http.getRecord("role/onlyroles").subscribe(
      (res) => {
        this.Roles = res;
        console.log(this.Roles);
      }
    )
  }

  changeEdit(roleid:any){
    this.editingValueForId = roleid;
    
    this.Roles.map((role:any)=>{
      if(role.id == roleid)
        this.editingValueForName = role.roleName
    })

    const EditRole = {roleId:roleid, roleName:this.editingValueForName }; 
    this.roleEditForm.patchValue(EditRole);
  }

  /*
  AddPermission(){
    console.log(this.givepermissionForm.value);
    var hasPermission:Boolean = false;
    const formDetails:any = this.givepermissionForm.value;
    var permission:any ={roleId:"", permissionName:""}

    this.Roles.map((role:any)=>{
      if(role.roleName == formDetails.roleSelect){
        this.addpermissionforID = role.id;       
        if(role.permissions.includes(formDetails.permissionSelect))
        {
          hasPermission = true;       
        }
      }
    });

    if(hasPermission){
      window.alert(`${formDetails.roleSelect} already have permission to ${formDetails.permissionSelect}`)
    }
    else{
      permission.permissionName = formDetails.permissionSelect;
      permission.roleId = this.addpermissionforID;
      console.log(permission);
      this._http.postRecord(`permission`,permission).subscribe(
        (res) => {
          // this.getPermissionsDetails();
          console.log(res)
        },
        (error) => {console.log(error)}
      );
    }
    console.log(hasPermission);

  }*/
  
  UpdateRole(){
    console.log(this.roleEditForm.value);
    
    const editDetails:any = this.roleEditForm.value;

    if(this.editingValueForId==editDetails.roleId && this.editingValueForName==editDetails.roleName){
      window.alert("No Changes found");
      this.editingValueForId = -1;
      return;
    }
    const updatedRole:any = {
      id:editDetails.roleId,
      roleName:editDetails.roleName
    }
    this._http.updateRecord(`role/${this.editingValueForId}`, updatedRole).subscribe(
      (res)=>{
        window.alert(`Update role (${this.editingValueForId})${this.editingValueForName} to (${editDetails.roleId})${editDetails.roleName}`);
        this.getRoles();
        this.editingValueForId = -1;
      },
      (error) => {console.log(error);}
    )
  }


  deleteRole(roleid:any){
    this._http.deleteRecord(`role/${roleid}`).subscribe(
      (res)=>{this.getRoles();},
      (error)=>{console.log(error);}
    )
  }


  changeroAddRole(){
    this.editingValueForId = -1;
    this.isAddingNewRole = true;
  }

  addRole(){
    var newRole = {
      roleName:this.roleEditForm.value.roleName
    }
    this._http.postRecord("role", newRole).subscribe(
      (res)=>{this.isAddingNewRole = false;this.getRoles();},
      (error)=>{console.log("error");}
    );
  }

}
