import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OfferService} from "../../services/offer.service";
import {Offer} from "../../classes/offer";


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  value: string | null = ''
  offer: Offer = new Offer('', '', '', 0, '')

  constructor(private router: ActivatedRoute, private offerService: OfferService) {
  }

  ngOnInit(): void {
    this.value = this.router.snapshot.paramMap.get('name')
    this.offerService.getOfferByName(this.value).subscribe(data => this.handleSucess(data))
  }

  handleSucess(data: Offer) {
    this.offer = data
  }

}
