import { Routes } from '@angular/router';
import { UserLoginComponent } from './UserModule/user-login/user-login.component';
import { UserRegistrationComponent } from './UserModule/user-registration/user-registration.component';

export const routes: Routes = [
    {path:"", component:UserLoginComponent},
    {path:"userregistration", component:UserRegistrationComponent},
    {path:"**", component:UserLoginComponent}

];
