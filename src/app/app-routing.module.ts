import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { UsersOverviewComponent } from './admin/users/overview/users-overview.component';
import { UserComponent } from './users/user/user.component';
import { CreateUserComponent } from './admin/users/crud/create/create-user.component';


const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'detail/:id', component: HeroDetailComponent },

    { path: 'users/users-overview', component: UsersOverviewComponent },
    { path: 'users/:id', component: UserComponent },
    { path: 'users/create', component: CreateUserComponent },

    { path: '*', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
