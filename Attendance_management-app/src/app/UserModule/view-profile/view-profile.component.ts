import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/user/user.state';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { saveUserData } from '../../../store/user/user.actions';
import { CommonModule } from '@angular/common';
import { DbservicesService } from '../../services/db/dbservices.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {

  private userstore = inject(Store<{user:UserState}>)
    public user:any;
    public profileImageUrl:any;
    public canEdit:boolean = false;
    public editingPhoto:boolean = false;
    public editingDetails:boolean = false;
    selectedFile:any;
    detailsForm:any;

  constructor(private _route:Router, private _http: DbservicesService){}
    
    ngOnInit(){
      this.userstore.select(state => state.user).subscribe(data => this.user=data);
      console.log(this.user);
      
      if(!this.user.permissions.includes("ViewProfile"))
        this._route.navigate(['/']);
      if(this.user.permissions.includes("EditProfile")) 
        this.canEdit = true;

      this.detailsForm = new FormGroup({
            name:new FormControl("",[Validators.required]),
            email:new FormControl("", [Validators.required]),
            password:new FormControl("",[Validators.required])
          })
      
      this.profileImageUrl = `${this._http.baseURL}/Image/Get/${this.user.profilepicture}`;
    };

    onFileSelected(event:any){
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    }
  
    onUpload() {
      if (!this.selectedFile) return;
    
      const fileExtension = this.selectedFile.name.split('.').pop();
      if(fileExtension != "jpg") return;
  
      const formData = new FormData();
      formData.append('file', this.selectedFile, `${this.user.id}.${fileExtension}`);
    
      // Send the file to the server
      this._http.postRecord("Image/Upload", formData).subscribe(
        (response: any) => {
          console.log('upload successful', response);
          var User = {
            ...this.user,
            profilepicture:`${this.user.id}.jpg`,
          }
          this.userstore.dispatch(saveUserData(User));
          localStorage.setItem('user', JSON.stringify(User));
          this.profileImageUrl = `${this._http.baseURL}/Image/Get/${this.user.profilepicture}`;
          this.editingPhoto=false;
          window.location.reload();
        },
        (error: any) => {
          console.error('upload failed', error);
        }
      );
    }
    
    changeToForm(){
      this.editingDetails = true;
      this.editingPhoto=false;
      console.log(this.user.password);

      this.detailsForm.setValue({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
      });

    }

    updateUser(){
      var userData:any = this.detailsForm.value;
      var updatedUser = {
        id: this.user.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: this.user.role,
        profilepicture: this.user.profilepicture,
        createdat:this.user.createdat
    }
    console.log("Changing user data to ", updatedUser);
    this._http.updateRecord(`User/${this.user.id}`, updatedUser).subscribe(
      (res)=>{
        console.log("Updated Successfully");
        
        var User = {
          id:this.user.id,
          name:userData.name,
          email:userData.email,
          password:userData.password,
          role:this.user.role,
          permissions:this.user.permissions,
          profilepicture:this.user.profilepicture,
          createdat:this.user.createdat
        }
        this.userstore.dispatch(saveUserData(User));
        localStorage.setItem('user', JSON.stringify(User));
        this.editingDetails = false;
      },
      (error)=>{
        console.log(error);
      }
    )
    }

}
