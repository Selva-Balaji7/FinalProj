import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbservicesService } from '../../services/db/dbservices.service';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/user/user.state';
import { saveUserData } from '../../../store/user/user.actions';

@Component({
  selector: 'app-user-login',
  imports: [FormsModule, RouterModule, ReactiveFormsModule],
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
      id:new FormControl("", [Validators.required]),
      password:new FormControl("", [Validators.required])
    })
  }

  AuthenticateUser(){
    this.LData = this.LoginForm.value;
    this.reqUrl = `user/${this.LData.id}/verify?password=${this.LData.password}`;

    console.log(this.reqUrl);
    this._http.getRecord(this.reqUrl).subscribe(
      (res)=>{
        if(res){
          window.alert("Logged in");
          this.LogginSequence();
        }
        else{
          window.alert("Wrong Password");
        }
      },
      (error)=>{
        window.alert(error.error);
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
  
}
