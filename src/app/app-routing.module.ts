import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersOverviewComponent } from './admin/users/overview/users-overview.component';
import { UserComponent } from './users/user/user.component';
import { CreateUserComponent } from './admin/users/crud/create/create-user.component';
import { LoginComponent } from './users/authenticate/login/login.component';
import { RegisterComponent } from './users/authenticate/register/register.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';


const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },

    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },

    { path: 'account', component: UserComponent },
    { path: 'account/details', component: UserDetailsComponent },

    { path: 'users/users-overview', component: UsersOverviewComponent },
    { path: 'users/create', component: CreateUserComponent },
    { path: 'users/:id', component: UserComponent }, //Should be last to not conflict with the static /users/ paths

    { path: '*', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
