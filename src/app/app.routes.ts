import { Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { HomepageComponent } from './shared/homepage/homepage.component';
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'homepage',component:HomepageComponent},
    {path:'forgotpassword',component:ForgotPasswordComponent},
    {path:'resetpassword/:id',component:ResetPasswordComponent},
    {path:'',redirectTo:'login',pathMatch:'full'}
];
