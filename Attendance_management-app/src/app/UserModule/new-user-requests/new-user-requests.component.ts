import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/user/user.state';
import { Router } from '@angular/router';
import { DbservicesService } from '../../services/db/dbservices.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-requests',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-user-requests.component.html',
  styleUrl: './new-user-requests.component.css'
})
export class NewUserRequestsComponent {
  private userstore = inject(Store<{user:UserState}>)
  public user:any;
  public Roles:any;
  public userRequests:any = [];
  public viewRequestOf:number = -1;
  updateRequestForm:any;

  constructor(private _route:Router, private _http: DbservicesService){}
  
  ngOnInit(){
    this.userstore.select(state => state.user).subscribe(data => this.user=data);

    if(!this.user.permissions.includes("NewUserRequests"))
      this._route.navigate(['/']);
    else
      this.getUserRequests();

    this.updateRequestForm = new FormGroup({
      id: new FormControl("",[Validators.required]),
      name: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]),
      role: new FormControl("",[Validators.required]),
      profilePicture: new FormControl("",[Validators.required])
    })

    this._http.getRecord("role/onlyroles").subscribe(
      (res)=>{
        this.Roles = res;
        console.log(res);
      }
    )
  }

  getUserRequests(){
    this._http.getRecord("usersregistration").subscribe(
      (res)=>{
        console.log(res);
        this.userRequests = res;
      },
      (error)=>{console.log(error)}
    )
  }

  approveUser(){
    var userData:any = this.updateRequestForm.value;
    var newUser = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      profilePicture: userData.profilePicture
  }
    

    this._http.postRecord("user", newUser).subscribe(
      (res) =>{
        console.log("User Added to User Table");

        this._http.deleteRecord(`usersregistration/${newUser.id}`).subscribe(
          (res)=>{
            console.log("User Request Deleted from Table");
            this.viewRequestOf = -1;
            this.getUserRequests();
          },
          (er) => {console.log(er);}
        )

      },
      (error)=>{console.log(error)}
    )

  }

  rejectUser(){
    this._http.deleteRecord(`Usersregistration/${this.viewRequestOf}`).subscribe(
      (res)=>{
        console.log("reject for user id", this.viewRequestOf);
        this.viewRequestOf = -1;
        this.getUserRequests();
      },
      (error)=>{console.log(error);}
    )
  }

  
  setvalues(requests:any){
    console.log("Setting Value");
    this.viewRequestOf = requests.id;

    this.updateRequestForm.setValue({
      id: requests.id,
      name: requests.name,
      email: requests.email,
      password: requests.password,
      role: requests.role,
      profilePicture:requests.profilePicture
    });
    return true;
  }



}
