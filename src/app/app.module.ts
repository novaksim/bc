import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { OffersComponent } from './components/offers/offers.component';
import { ContactComponent } from './components/contact/contact.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { HomeComponent } from './components/home/home.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorComponent } from './components/error/error.component';
import { OfferComponent } from './components/offer/offer.component';
import { MyoffersComponent } from './components/myoffers/myoffers.component';
import {AuthInterceptor} from "./services/auth.interceptor";
import { ManagementComponent } from './components/management/management.component';
// import {HttpIntercepterBasicAuthService} from "./services/http/http-intercepter-basic-auth.service";
// import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    OffersComponent,
    ContactComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    ErrorComponent,
    OfferComponent,
    MyoffersComponent,
    ManagementComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
