import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

//Project
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { NutrientsComponent } from './nutrition/nutrients/nutrients.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { UsersComponent } from './users/user/users.component';
import { NourishmentComponent } from './nutrition/nourishment/nourishment.component';
import { UserComponent } from './users/user/user.component';
import { LoginComponent } from './users/authenticate/login/login.component';
import { DetailsComponent } from './users/account/details/details.component';
import { SettingsComponent } from './users/account/settings/settings.component';
import { UpgradeComponent } from './users/account/upgrade/upgrade.component';
import { OverviewComponent } from './admin/users/overview/overview.component';
import { SearchComponent } from './admin/users/search/search.component';
import { CreateUserComponent } from './admin/users/crud/create/create-user.component';
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
    LoginComponent,
    DetailsComponent,
    SettingsComponent,
    UpgradeComponent,
    OverviewComponent,
    SearchComponent,
    CreateUserComponent,
    SubmitComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    //Material
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill', floatLabel: 'always' } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
