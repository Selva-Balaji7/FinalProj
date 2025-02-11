import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/user/user.state';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { saveUserData } from '../../../store/user/user.actions';
import { CommonModule } from '@angular/common';
import { DbservicesService } from '../../services/db/dbservices.service';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  private userstore = inject(Store<{user:UserState}>)
  public user:any;
  public profileImageUrl:any;

  constructor(private _route:Router, private _http: DbservicesService){}
  
  ngOnInit(){
    this.userstore.select(state => state.user).subscribe(data => this.user=data);
    if(!this.user.id){
      var localuser:any = localStorage.getItem('user');
      if(!!localuser){
        this.userstore.dispatch(saveUserData(JSON.parse(localuser)));
      }
      else{
        this._route.navigate(['/']);
      }
    }
    console.log(this.user);
    this.profileImageUrl =`${this._http.baseURL}/Image/Get/${this.user.profilepicture}`;
  };

  LogoutSequence(){
    localStorage.removeItem('user');
    window.location.reload();
  }

}
