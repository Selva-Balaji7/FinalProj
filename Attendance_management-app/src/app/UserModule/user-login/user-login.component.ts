import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbservicesService } from '../../services/db/dbservices.service';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/user/user.state';
import { saveUserData } from '../../../store/user/user.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  LoginForm:any;
  User:any = {
    id:0,
    name:"",
    email:"",
    role:"",
    permissions:[],
    profilepicture:"",
}
  LData:any;
  reqUrl:any;

  private userstore = inject(Store<{user:UserState}>)

  constructor(private _http : DbservicesService, private _route:Router){}

  ngOnInit(){
    this.LoginForm = new FormGroup({
      id:new FormControl("", [Validators.required, Validators.pattern("^[0-9]{3,4}$")]),
      password:new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z@_0-9]{3,20}$")])
    })

    this._http.getRecord('Attendance/isOnline').subscribe(
      (res:any) => {
        this.addMessage({type:"success", message:"Server Online"});
      },
      (error:any) => {
        this.addMessage({type:"failure", message:"Server Offline"});
      }
    )

    
  }

  AuthenticateUser(){
    this.LData = this.LoginForm.value;
    this.reqUrl = `user/${this.LData.id}/verify?password=${this.LData.password}`;

    console.log(this.reqUrl);
    this._http.getRecord(this.reqUrl).subscribe(
      (res)=>{
        if(res){
          this.addMessage({type:"success", message:"Loged In"});
          this.LogginSequence();
        }
        else{
          this.addMessage({type:"failure", message:"Wrong Password"});
        }
      },
      (error)=>{
        this.addMessage({type:"failure", message:error.error});
      }
    )

  }

  LogginSequence(){
    this.reqUrl = `user/${this.LData.id}`;
    var userData:any;
    var permissions:any[] = [];

    this._http.getRecord(this.reqUrl).subscribe(
      (res) => {
        userData = res;
        this.reqUrl = `permission/${userData.role}`
        this._http.getRecord(this.reqUrl).subscribe(
          (res) => {
              permissions = Object.values(res).map((item:any)=>item.permissionName);

              this.User = {
                id:userData.id,
                name:userData.name,
                email:userData.email,
                role:userData.role,
                permissions:permissions,
                profilepicture:userData.profilePicture,
              }
              this.userstore.dispatch(saveUserData(this.User));
              localStorage.setItem('user', JSON.stringify(this.User));
              this._route.navigate(["/dasboard"]);
              console.log(this.User);
          },
          (error) => {console.log(error)}
        )
      },
      (error) => {console.log(error)}
    )    
  }

  validate(formcontrolname:any){
    if(this.LoginForm.get(formcontrolname).touched && this.LoginForm.get(formcontrolname).invalid){
      if(this.LoginForm.get(formcontrolname).errors.required){
        if(formcontrolname == "id")
          this.addMessage({type:"warning", message:"Id Field is Requied"});
        else
          this.addMessage({type:"warning", message:"Password Field is Requied"});
      }
      if(this.LoginForm.get(formcontrolname).errors.pattern){
        this.addMessage({type:"warning", message:"Id Should 3 or 4 Digit Number"});
      }
    }
  }


  addMessage(message:any){
    console.log("adding message", message.message);
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
