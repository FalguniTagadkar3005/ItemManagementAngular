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
import { AuthGuardAdminService } from './guards/auth-guard-admin.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { ItemTypesComponent } from './components/admin/item-types/item-types.component';
import { AddItemTypesComponent } from './components/admin/add-item-type/add-item-type.component';
import { EditItemTypeComponent } from './components/admin/edit-item-type/edit-item-type.component';
import { ItemsComponent } from './components/admin/items/items.component';
import { AddItemComponent } from './components/admin/add-item/add-item.component';
import { EditItemComponent } from './components/admin/edit-item/edit-item.component';
import { RequestsComponent } from './components/developer/requests/requests.component';
import { AuthGuardDeveloperService } from './guards/auth-guard-developer.service';
import { AddRequestComponent } from './components/developer/add-request/add-request.component';
import { ReturnRequestsComponent } from './components/developer/return-requests/return-requests.component';
import { EditRequestComponent } from './components/developer/edit-request/edit-request.component';
import { AddReturnRequestComponent } from './components/developer/add-return-request/add-return-request.component';
import { EditReturnRequestComponent } from './components/developer/edit-return-request/edit-return-request.component';
import { PurchaseRequestsComponent } from './components/networkAdmin/purchase-requests/purchase-requests.component';
import { AuthGuardNetworkAdminService } from './guards/auth-guard-network-admin.service';
import { DeveloperRequestsComponent } from './components/networkAdmin/developer-requests/developer-requests.component';
import { AddPurchaseRequestComponent } from './components/networkAdmin/add-purchase-request/add-purchase-request.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'homepage',component:HomepageComponent,canActivate:[AuthGuardService],
        children: [
        {path:'myprofile',component:UserProfileComponent,canActivate:[AuthGuardService]},
        {path:'changepassword',component:ChangePasswordComponent,canActivate:[AuthGuardService]},

        {path:'users',component:UsersComponent,canActivate:[AuthGuardAdminService]},
        {path:'add-user',component:AddUserComponent,canActivate:[AuthGuardAdminService]},
        {path:'edit-user/:id',component:EditUserComponent,canActivate:[AuthGuardAdminService]},
        {path:'item-types',component:ItemTypesComponent,canActivate:[AuthGuardAdminService]},
        {path:'add-item-type',component:AddItemTypesComponent,canActivate:[AuthGuardAdminService]},
        {path:'edit-item-type/:id',component:EditItemTypeComponent,canActivate:[AuthGuardAdminService]},
        {path:'items',component:ItemsComponent,canActivate:[AuthGuardAdminService]},
        {path:'add-item',component:AddItemComponent,canActivate:[AuthGuardAdminService]},
        {path:'edit-item/:id',component:EditItemComponent,canActivate:[AuthGuardAdminService]},

        {path:'requests',component:RequestsComponent,canActivate:[AuthGuardDeveloperService]},
        {path:'return-requests',component:ReturnRequestsComponent,canActivate:[AuthGuardDeveloperService]},
        {path:'add-request',component:AddRequestComponent,canActivate:[AuthGuardDeveloperService]},
        {path:'edit-request/:id',component:EditRequestComponent,canActivate:[AuthGuardDeveloperService]},
        {path:'add-return-request',component:AddReturnRequestComponent,canActivate:[AuthGuardDeveloperService]},
        {path:'edit-return-request/:id',component:EditReturnRequestComponent,canActivate:[AuthGuardDeveloperService]},

        {path:'purchase-requests',component:PurchaseRequestsComponent,canActivate:[AuthGuardNetworkAdminService]},
        {path:'developer-requests',component:DeveloperRequestsComponent,canActivate:[AuthGuardNetworkAdminService]},
        {path:'add-purchase-request',component:AddPurchaseRequestComponent,canActivate:[AuthGuardNetworkAdminService]}
     ]},
    {path:'forgotpassword',component:ForgotPasswordComponent},
    {path:'resetpassword/:id',component:ResetPasswordComponent},
   
    {path:'',redirectTo:'login',pathMatch:'full'}
];
