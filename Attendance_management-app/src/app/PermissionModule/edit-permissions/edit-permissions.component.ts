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
  selector: 'app-edit-permissions',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-permissions.component.html',
  styleUrl: './edit-permissions.component.css'
})
export class EditPermissionsComponent {

  private userstore = inject(Store<{user:UserState}>)
      public user:any;  
      Roles:any = [];
      givepermissionForm:any;
      addpermissionforID:any;
      PermissionList:any = PermissionList;
    
      constructor(private _route:Router, private _http:DbservicesService){}
    
      ngOnInit(){
        this.userstore.select(state => state.user).subscribe(data => this.user=data);
    
        if(!this.user.permissions.includes("EditPermissions"))
          this._route.navigate(['/']);
        else
          this.getPermissionsDetails();

        
        this.givepermissionForm = new FormGroup({
          roleSelect: new FormControl("", [Validators.required]),
          permissionSelect: new FormControl("", [Validators.required]),
        })
        
      }


      getPermissionsDetails(){
        this._http.getRecord("role").subscribe(
          (res) => {
            this.Roles = res;
            this.Roles = this.Roles.map(
              (role:any)=>{
                return {...role,permissions:role.permissions.map((val:any)=>{return val.permissionName})}
              })
            console.log(this.Roles);
          }
        )
      }

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
              this.getPermissionsDetails();
              console.log(res)
            },
            (error) => {console.log(error)}
          );
        }
        console.log(hasPermission);

      }
      
      UpdatePermission(){
        console.log(this.givepermissionForm.value);
        var hasPermission:Boolean = false;
        const formDetails:any = this.givepermissionForm.value;

        this.Roles.map((role:any)=>{
          if(role.roleName == formDetails.roleSelect){
            this.addpermissionforID = role.id;       
            if(role.permissions.includes(formDetails.permissionSelect))
            {
              hasPermission = true;       
            }
          }
        });

        if(!hasPermission){
          window.alert(`${formDetails.roleSelect} doesn't have permission to ${formDetails.permissionSelect}`)
        }
        else{
          this._http.deleteRecord(`permission/${formDetails.permissionSelect}?roleid=${this.addpermissionforID}`).subscribe(
            (res)=>{
              window.alert(`Deleted permission ${formDetails.permissionSelect} for role ${formDetails.roleSelect}`);
              this.getPermissionsDetails();
            },
            (error) => {console.log(error);}
          )
        }
        
      }

      togglePermission(role: any, permission: string, event: any) {
        if (event.target.checked) {
            // Add permission if not already present
            if (!role.permissions.includes(permission)) {
                role.permissions.push(permission);
            }
        } else {
            // Remove permission if it exists
            role.permissions = role.permissions.filter((perm: string) => perm !== permission);
        }
    }
    




}
