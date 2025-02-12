import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DbservicesService } from '../../services/db/dbservices.service';
import { addMessage } from '../../../common/popupmessage';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  ForgotPasswordForm:any;
  newPasswordForm:any;
  User:any;
  FPdata:any;
  isVerifiedUser:boolean = false;
  
  
  constructor(private _http : DbservicesService, private _route:Router){}

  ngOnInit(){
    this.ForgotPasswordForm = new FormGroup({
      id:new FormControl("", [Validators.required, Validators.pattern("^[0-9]{3,4}$")]),
      email:new FormControl("", [Validators.required])
    }) 
    this.newPasswordForm = new FormGroup({
      password:new FormControl("", [Validators.required]),
      confirmpassword:new FormControl("", [Validators.required]),
    }) 
  }

  VerifyUser(){
    this.FPdata = this.ForgotPasswordForm.value;

    this._http.getRecord(`User/${this.FPdata.id}`).subscribe(
      (res:any)=>{
        addMessage({type:"success", message:"Found User"});
        if(this.FPdata.email == res.email){
          addMessage({type:"success", message:"User Verifies"});
          this.User = res;
          this.isVerifiedUser = true;
        }
        else{
          addMessage({type:"failure", message:"Verification Failed"});
        }
      },
      (error)=>{
        addMessage({type:"failure", message:"No User Found"});
      }
    )

  }

  ChangePassword(){
    this.User = {
      id:this.User.id,
      name:this.User.name,
      email:this.User.email,
      password:this.newPasswordForm.value.password,
      role:this.User.password,
      profilePicture:this.User.profilePicture
    }
   
    this._http.postRecord("User", this.User).subscribe(
      (res)=>{
        addMessage({type:"success", message:"Password Updated"});
        setTimeout(() => {
          this._route.navigate(['/']);          
        }, 2000);
      },
      (error)=>{
        addMessage({type:"failure", message:"Unable to Update Password"});
      }
    )
  }

  validate(formcontrolname:any){
    if(this.ForgotPasswordForm.get(formcontrolname).touched && this.ForgotPasswordForm.get(formcontrolname).invalid){
      if(this.ForgotPasswordForm.get(formcontrolname).errors.required){
        if(formcontrolname == "id")
          addMessage({type:"warning", message:"Id Field is Requied"});
        else
          addMessage({type:"warning", message:"Email Field is Requied"});
      }
      if(this.ForgotPasswordForm.get(formcontrolname).errors.pattern){
        addMessage({type:"warning", message:"Email is invalid"});
      }
    }
  }

}
