import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/user/user.state';
import { Router, RouterOutlet } from '@angular/router';
import { saveUserData } from '../../../store/user/user.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  private userstore = inject(Store<{user:UserState}>)
  public user:any;

  constructor(private _route:Router){}
  
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
  }

}
