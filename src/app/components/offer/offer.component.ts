import { Component, OnInit } from '@angular/core';
import {Offer} from "../../classes/offer";
import {ActivatedRoute} from "@angular/router";
import {OfferService} from "../../services/offer.service";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offer: Offer = new Offer('','','',0, '');
  offerName: string = '';

  constructor(private route:ActivatedRoute,
              private offerService: OfferService) { }

  ngOnInit(): void {
    this.offerName = this.route.snapshot.params['name'];
    this.offerService.getOfferByName(this.offerName).subscribe(data => this.handelSuccessResponse(data))
  }

  handelSuccessResponse(data: Offer) {
    this.offer = data;
  }

}
