import { Component, OnInit } from '@angular/core';
import {OfferService} from "../../services/offer.service";
import {Offer} from "../../classes/offer";
import {UserService} from "../../services/user.service";
import {AuthServiceService} from "../../services/auth-service.service";
import {ValidateService} from "../../services/validate.service";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  isAdmin:boolean = false;
  offersList: Offer[] = [];
  loggedUser:string | null = localStorage.getItem("username")

  constructor(private offerService:OfferService, public validateService:ValidateService) { }

  ngOnInit(): void {
    this.validateService.isValidLoginAdmin().subscribe(data => this.handleSucces(data))
    this.offerService.getAllOffers().subscribe(result => {
        this.offersList = result
        this.offersList.forEach(offer => {
          this.offerService.getPictureById(offer.picture).subscribe(picture => {
            offer.image = picture.data;
          })
        })
      }
    )
  }

  handleSucces = (data: boolean) => {
    this.isAdmin = data;
  }


  remove(id: number) {
    this.offersList = this.offersList.filter(offer => offer.id !== id);
    this.offerService.deleteOfer(id);
  }
}
