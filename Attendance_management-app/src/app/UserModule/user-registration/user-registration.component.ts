import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule , ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { DbservicesService } from '../../services/db/dbservices.service';
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
  roles:any = [];
  hasUploadedProfileImage:Boolean = false;

  profilePic:string = "ProfilePhotoPlaceholder.png";

  constructor(private http : DbservicesService, private _route:Router){}

  ngOnInit():void{
    this.regForm = new FormGroup({
      id:new FormControl("",[Validators.required]),
      name:new FormControl("",[Validators.required]),
      email:new FormControl("", [Validators.required]),
      password:new FormControl("",[Validators.required]),
      role:new FormControl("", [Validators.required])
    })

    this.http.getRecord("role/onlyroles").subscribe(
    (res)=>{
      this.roles = res;
      console.log(res);
    },
    (error)=>{
      console.log(error);
    }
  )
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload() {
    if (!this.selectedFile) return;
  
    const fileExtension = this.selectedFile.name.split('.').pop();
    if(fileExtension != "jpg") return;

    const formData = new FormData();
    formData.append('file', this.selectedFile, `${this.regForm.value.id}.${fileExtension}`);
  
    // Send the file to the server
    this.http.postRecord("Image/Upload", formData).subscribe(
      (response: any) => {
        console.log('upload successful', response);
        this.profilePic = `${this.http.baseURL}/Image/Get/${this.regForm.value.id}.jpg`;
        this.hasUploadedProfileImage = true;
      },
      (error: any) => {
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
        this.http.getRecord(`Usersregistration/${this.regForm.value.id}`).subscribe(
          (response:any) => {
            console.log("User Already Registered", response);
            return;
          },
          (error:any) => {
            console.log("New UserRegistration");


            let fileName:string = `${this.regForm.value.id}.jpg`;
            console.log("Trying to create a user ");
            let user = {
              "id":this.regForm.value.id,
              "name": this.regForm.value.name,
              "email": this.regForm.value.email,
              "password": this.regForm.value.password,
              "role": this.regForm.value.role,
              "profilePicture":fileName};
            console.log(user);
        
        
            this.http.postRecord('Usersregistration', user).subscribe(
              (response:any) => {
                this.onUpload();
                console.log("User Registered Successfully", response);
                this._route.navigate(['/']);
              },
              (error:any) => {
                console.error("Registration Failed", error);
              }
            );


          }
        );
      }
    );
    


  }



  addMessage(message:any){

    var messagebox = document.getElementById("MessageBox");
    var messagetext = document.createElement("div");
    messagetext.innerHTML = message.message;
    messagetext.classList.add("messagetext")
    messagebox?.appendChild(messagetext);
    
    if(message.type == "success")
      messagetext.classList.add("successmessage")
    if(message.type == "warning")
      messagetext.classList.add("warningmessage")
    if(message.type == "failure")
      messagetext.classList.add("failuremessage")   
    
    setTimeout(() => {
      messagetext.remove();
    }, 5800);
  }
}
