import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/user/user.state';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { saveUserData } from '../../../store/user/user.actions';
import { CommonModule } from '@angular/common';
import { DbservicesService } from '../../services/db/dbservices.service';

@Component({
  selector: 'app-view-profile',
  imports: [CommonModule],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {

  private userstore = inject(Store<{user:UserState}>)
    public user:any;
    public profileImageUrl:any;

  constructor(private _route:Router, private _http: DbservicesService){}
    
    ngOnInit(){
      this.userstore.select(state => state.user).subscribe(data => this.user=data);
      
      console.log(this.user);
      this.profileImageUrl = `${this._http.baseURL}/Image/Get/${this.user.id}.jpg`;
    };
}
