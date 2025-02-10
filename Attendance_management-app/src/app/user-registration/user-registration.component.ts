import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule , ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { DbservicesService } from '../services/db.service.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  selectedFile:any;
  regForm:any;

  profilePic:string = "ProfilePhotoPlaceholder.png";

  constructor(private http : DbservicesService, private _route:Router){}

  showPassword:boolean=false;

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  ngOnInit():void{
    this.regForm = new FormGroup({
      id:new FormControl("",[Validators.required]),
      name:new FormControl("",[Validators.required]),
      email:new FormControl("", [Validators.required]),
      password:new FormControl("",[Validators.required]),
      role:new FormControl("", [Validators.required]),
      profilePicture:new FormControl("", [Validators.required])
    })
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload(){
    if(!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile,this.selectedFile.name);

    this.http.postRecord("user/profileimage",formData).subscribe(
      (response:any) => {
        console.log('upload successfull', response)
        this.profilePic = response.imageUrl;
      },
      (error:any) => {
        console.error('upload failed', error);
      }
    );
  }
  
  registerUser(){
    this.http.getRecord(`User/${this.regForm.value.id}`).subscribe(
      (response:any) => {
        console.log("You are already a User", response);
        return;
      },
      (error:any) => {
        console.log("New User");
      }
    )
    this.http.getRecord(`UserRegistration/${this.regForm.value.id}`).subscribe(
      (response:any) => {
        console.log("User Already Registered", response);
        return;
      },
      (error:any) => {
        console.error("New UserRegistration");
      }
    )

    let fileName:string = this.selectedFile.name;
    let user = {
      "id":this.regForm.value.id,
      "name": this.regForm.value.name,
      "email": this.regForm.value.email,
      "password": this.regForm.value.password,
      "role": this.regForm.value.role,
      "profilePicture":fileName};
    console.log(user);


    this.http.postRecord('Userregistration', user).subscribe(
      (response:any) => {
        console.log("User Registered Successfully", response);
        this._route.navigate(['/']);
      },
      (error:any) => {
        console.error("Registration Failed", error);
      }
    )

  }

}