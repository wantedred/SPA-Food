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


const mainRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    
    { path: 'inventory', component: InventoryComponent },

    { path: 'users/users-overview', component: UsersOverviewComponent },
    { path: 'users/create', component: CreateUserComponent },
    { path: 'users/:id', component: UserComponent }, //Should be last to not conflict with the static /users/ paths

    { path: '*', component: HomePageComponent },
];

const authRoutes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
];

const accountRoutes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'account/details', component: AccountDetailsComponent },
  { path: 'account/preferences', component: AccountPreferencesComponent },
  { path: 'account/settings', component: AccountSettingsComponent },
  { path: 'account/upgrade', component: AccountUpgradeComponent },
  { path: 'account/change-password', component: ChangePasswordComponent },
];

const recipeRoutes: Routes = [
  { path: 'recipes', component: RecipeDetailsComponent },
  { path: 'recipes/submit', component: RecipeDetailsComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(mainRoutes),
    RouterModule.forRoot(authRoutes),
    RouterModule.forRoot(accountRoutes),
    RouterModule.forRoot(recipeRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
