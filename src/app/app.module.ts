import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Material
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

//Project
import { NutrientsComponent } from './nutrition/nutrients/nutrients.component';
import { NourishmentComponent } from './nutrition/nourishment/nourishment.component';
import { UserComponent } from './users/user/user.component';
import { LoginComponent } from './users/authenticate/login/login.component';
import { RegisterComponent } from './users/authenticate/register/register.component';
import { UsersOverviewComponent } from './admin/users/overview/users-overview.component';
import { SearchComponent } from './admin/users/search/search.component';
import { CreateUserComponent } from './admin/users/crud/create/create-user.component';
import { SubmitComponent } from './nutrition/nourishments/submit/submit.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { InboxComponent } from './professional/inbox/inbox.component';
import { ClientDetailComponent } from './professional/clients/client-detail/client-detail.component';
import { ClientsOverviewComponent } from './professional/clients/clients-overview/clients-overview.component';
import { NewMessageComponent } from './professional/inbox/crud/new-message/new-message.component';
import { AccountDetailsComponent } from './users/account/account-details/account-details.component';
import { AccountSettingsComponent } from './users/account/account-settings/account-settings.component';
import { AccountPreferencesComponent } from './users/account/account-preferences/account-preferences.component';
import { AccountUpgradeComponent } from './users/account/account-upgrade/account-upgrade.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AccountComponent } from './users/account/account.component';
import { RecoveryComponent } from './users/authenticate/recovery/recovery.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { InventoryComponent } from './users/inventory/inventory.component';
import { MainNavigationComponent } from './navigation/main-navigation/main-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    //Project
    NutrientsComponent,
    NourishmentComponent,
    UserComponent,
    LoginComponent,
    UsersOverviewComponent,
    SearchComponent,
    CreateUserComponent,
    SubmitComponent,
    UserDetailsComponent,
    RegisterComponent,
    InboxComponent,
    ClientDetailComponent,
    ClientsOverviewComponent,
    NewMessageComponent,
    AccountDetailsComponent,
    AccountSettingsComponent,
    AccountPreferencesComponent,
    AccountUpgradeComponent,
    HomePageComponent,
    AccountComponent,
    RecoveryComponent,
    RecipeComponent,
    InventoryComponent,
    MainNavigationComponent,
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
    MatInputModule,
    MatSortModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    FlexLayoutModule,
  ],
  exports: [
  ],
  entryComponents: [
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill', floatLabel: 'always' } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
