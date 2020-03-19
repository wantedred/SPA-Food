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
    UserComponent
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
