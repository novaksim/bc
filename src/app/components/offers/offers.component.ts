import { Component, OnInit } from '@angular/core';
import {OfferService} from "../../services/offer.service";
import {Offer} from "../../classes/offer";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  offersList: Offer[] = [];

  constructor(private offerService:OfferService, public userService:UserService) { }

  ngOnInit(): void {
    this.offerService.getAllOffers().subscribe(result => {
        this.offersList = result
        console.log(this.offersList)
        this.offersList.forEach(offer => {
          this.offerService.getPictureById(offer.picture).subscribe(picture => {
            console.log(picture.data)
            offer.image = picture.data;
          })
        })
      }
    )

    console.log(this.offersList);
  }

  remove(id: number) {
    this.offersList = this.offersList.filter(offer => offer.id !== id);
    this.offerService.deleteOfer(id);
  }
}
