import {Offer} from "./offer";
import {User} from "./user";

export class Reservation {
  offer:Offer;
  user:string | null;
  date:string;


  constructor(offer: Offer, user: string | null, date: string) {
    this.offer = offer;
    this.user = user;
    this.date = date;
  }
}
