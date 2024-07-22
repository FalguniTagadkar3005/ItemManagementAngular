import { Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { HomepageComponent } from './shared/homepage/homepage.component';
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'homepage',component:HomepageComponent,
        children: [
        {path:'myprofile',component:UserProfileComponent},
        {path:'changepassword',component:ChangePasswordComponent},
        {path:'users',component:UsersComponent},
        {path:'add-user',component:AddUserComponent},
        {path:'edit-user/:id',component:EditUserComponent}
     ]},
    {path:'forgotpassword',component:ForgotPasswordComponent},
    {path:'resetpassword/:id',component:ResetPasswordComponent},
   
    {path:'',redirectTo:'login',pathMatch:'full'}
];
