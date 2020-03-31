import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersOverviewComponent } from './admin/users/overview/users-overview.component';
import { UserComponent } from './users/user/user.component';
import { CreateUserComponent } from './admin/users/crud/create/create-user.component';
import { LoginComponent } from './users/authenticate/login/login.component';
import { RegisterComponent } from './users/authenticate/register/register.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AccountDetailsComponent } from './users/account/account-details/account-details.component';
import { AccountComponent } from './users/account/account.component';
import { AccountPreferencesComponent } from './users/account/account-preferences/account-preferences.component';
import { AccountSettingsComponent } from './users/account/account-settings/account-settings.component';
import { AccountUpgradeComponent } from './users/account/account-upgrade/account-upgrade.component';
import { InventoryComponent } from './users/inventory/inventory.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { ChangePasswordComponent } from './users/authenticate/change-password/change-password.component';
import { AuthGuardService } from './users/authenticate/guards/auth-guard.service';
import { NoAuthGuardService } from './users/authenticate/guards/no-auth-guard.service';
import { AdminGuardService } from './users/authenticate/guards/admin-guard.service';


const mainRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    
    { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuardService], canLoad: [AuthGuardService] },

    { path: '*', component: HomePageComponent },
];

const authRoutes: Routes = [
  { path: 'auth/login', component: LoginComponent, canActivate: [NoAuthGuardService], canLoad: [NoAuthGuardService] },
  { path: 'auth/register', component: RegisterComponent, canActivate: [NoAuthGuardService], canLoad: [NoAuthGuardService] },
];

const accountRoutes: Routes = [
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardService], canLoad: [AuthGuardService] },
  { path: 'account/details', component: AccountDetailsComponent, canActivate: [AuthGuardService], canLoad: [AuthGuardService] },
  { path: 'account/preferences', component: AccountPreferencesComponent, canActivate: [AuthGuardService], canLoad: [AuthGuardService] },
  { path: 'account/settings', component: AccountSettingsComponent, canActivate: [AuthGuardService], canLoad: [AuthGuardService] },
  { path: 'account/upgrade', component: AccountUpgradeComponent, canActivate: [AuthGuardService], canLoad: [AuthGuardService] },
  { path: 'account/change-password', component: ChangePasswordComponent, canActivate: [AuthGuardService], canLoad: [AuthGuardService] },
];

const recipeRoutes: Routes = [
  { path: 'recipes', component: RecipeDetailsComponent },
  { path: 'recipes/submit', component: RecipeDetailsComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent },
];

const adminRoutes: Routes = [
  { path: 'users/users-overview', component: UsersOverviewComponent, canActivate: [AdminGuardService], canLoad: [AdminGuardService] },
  { path: 'users/create', component: CreateUserComponent, canActivate: [AdminGuardService], canLoad: [AdminGuardService] },
  { path: 'users/:id', component: UserComponent, canActivate: [AdminGuardService], canLoad: [AdminGuardService] }, //Should be last to not conflict with the static /users/ paths
];

@NgModule({
  imports: [
    RouterModule.forRoot(mainRoutes),
    RouterModule.forRoot(authRoutes),
    RouterModule.forRoot(accountRoutes),
    RouterModule.forRoot(adminRoutes),
    RouterModule.forRoot(recipeRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
