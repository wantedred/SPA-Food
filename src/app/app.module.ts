import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';

//Customs
import { FormsModule } from '@angular/forms';

//Project
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { NutrientsComponent } from './nutrition/nutrients/nutrients.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { UsersComponent } from './users/user/users.component';
import { NourishmentComponent } from './nutrition/nourishment/nourishment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './users/user/user.component';
import { RegisterComponent } from './users/register/register.component';
import { AuthenticateComponent } from './users/authenticate/authenticate.component';
import { LoginComponent } from './users/authenticate/login/login.component';
import { DetailsComponent } from './users/account/details/details.component';
import { SettingsComponent } from './users/account/settings/settings.component';
import { UpgradeComponent } from './users/account/upgrade/upgrade.component';
import { OverviewComponent } from './admin/users/overview/overview.component';
import { SearchComponent } from './admin/users/search/search.component';
import { CreateComponent } from './admin/users/crud/create/create.component';
import { SuggestComponent } from './nutrition/nourishments/suggest/suggest.component';
import { SubmitComponent } from './nutrition/nourishments/submit/submit.component';

@NgModule({
  declarations: [
    AppComponent,
    //Project
    HeroesComponent,
    HeroDetailComponent,
    NutrientsComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    NourishmentComponent,
    UsersComponent,
    UserComponent,
    RegisterComponent,
    AuthenticateComponent,
    LoginComponent,
    DetailsComponent,
    SettingsComponent,
    UpgradeComponent,
    OverviewComponent,
    SearchComponent,
    CreateComponent,
    SuggestComponent,
    SubmitComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    //Customs
    FormsModule,
    //Material
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
