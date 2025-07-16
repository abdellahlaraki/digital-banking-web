import { Routes } from '@angular/router';
import {CustomersComponent} from './customers/customers.component';
import {AccountsComponent} from './accounts/accounts.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {LoginComponent} from './login/login.component';
import {AdminTemplateComponent} from './admin-template/admin-template.component';
import {authenticationGuard} from './guards/authentication.guard';
import {NotAuthorizedComponent} from './not-authorized/not-authorized.component';
import {authorizationGuard} from './guards/authorization.guard';
import {CustomerAccountsComponent} from './customer-accounts/customer-accounts.component';
import {NewCustomerAccountComponent} from './new-customer-account/new-customer-account.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {UsersComponent} from './users/users.component';
import {NewUserComponent} from './new-user/new-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';

export const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"admin",component:AdminTemplateComponent,canActivate:[authenticationGuard],children:[
      {path:"dashboard",component:DashboardComponent},
      {path:"customers",component:CustomersComponent},
      {path:"accounts",component:AccountsComponent},
      {path:"new-customer",component:NewCustomerComponent,canActivate:[authorizationGuard],data:{role:"ADMIN"}},
      {path:"customer-accounts/:id",component:CustomerAccountsComponent},
      {path:"notAuthorized",component:NotAuthorizedComponent},
      {path:"new-customer-account/:id",component:NewCustomerAccountComponent},
      {path:"profile",component:ProfileComponent},
      {path:"users",component:UsersComponent},
      {path:"new-user",component:NewUserComponent},
      {path:"edit-user/:id",component:EditUserComponent}

    ]
  },
];
