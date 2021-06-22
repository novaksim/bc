import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OfferService} from "../../services/offer.service";
import {Offer} from "../../classes/offer";
import {Reservation} from "../../classes/reservation";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../classes/user";
import {Roles} from "../../classes/roles";


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  value: string | null = ''
  offer: Offer = new Offer('', '', '', 0, '')
  reservation:Reservation = new Reservation(this.offer, localStorage.getItem('username'), '')


  constructor(private router: ActivatedRoute, private offerService: OfferService, private routerNavigate:Router) {
  }

  ngOnInit(): void {
    this.value = this.router.snapshot.paramMap.get('name')
    this.offerService.getOfferByName(this.value).subscribe(data => this.handleSucess(data))
  }

  handleSucess(data: Offer) {
    this.offer = data
    this.offerService.getPictureById(data.picture).subscribe(picture => {
      console.log(picture.data)
      this.offer.image = picture.data;
    })
  }

  onSubmit() {
    this.reservation.offer = this.offer;
    this.reservation.date = this.range.get("start")?.value + "-" + this.range.get("end")?.value;
    this.reservation.offer.user = new User("", "", "", "", Roles.USER);
    console.log(this.reservation.date)
    this.offerService.saveReservation(this.reservation).subscribe(data => {
        alert("Rezervácia úspešná")
        this.routerNavigate.navigate(['home'])
      },error => alert("Rezervácia neúspešná"))
  }
}
