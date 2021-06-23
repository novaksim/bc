import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../components/login/login.component";
import {ContactComponent} from "../components/contact/contact.component";
import {HomeComponent} from "../components/home/home.component";
import {RegisterComponent} from "../components/register/register.component";
import {UserService} from "../services/user.service";
import {OffersComponent} from "../components/offers/offers.component";
import {OfferComponent} from "../components/offer/offer.component";
import {MyoffersComponent} from "../components/myoffers/myoffers.component";
import {ManagementComponent} from "../components/management/management.component";
import {ReservationComponent} from "../components/reservation/reservation.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent, canActivate:[UserService] },
  { path: 'home', component: HomeComponent},
  { path: 'offers', component: OffersComponent },
  { path: 'manageOffers', component: ManagementComponent, canActivate:[UserService] },
  { path: 'profil', component: OffersComponent, canActivate:[UserService] },
  { path: 'offer/reservation/:name', component: ReservationComponent, canActivate:[UserService] },
  { path: 'offers/:name', component: OfferComponent, canActivate:[UserService] },
  { path: 'myOffers', component: MyoffersComponent, canActivate:[UserService] },
  { path: 'registration', component: RegisterComponent },
  { path: '**', component: HomeComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
