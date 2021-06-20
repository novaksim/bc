import {User} from "./user";
import {Roles} from "./roles";

export class Offer {
  id: number;
  price: string;
  name: string;
  country: string;
  maxPerson: number;
  picture: string;

  image: any;
  user: User = new User('', '', '', '', Roles.USER);


  constructor(price: string, name: string, country: string, maxPerson: number, picture: string) {
    this.id = 0;
    this.picture = picture;
    this.price = price;
    this.name = name;
    this.country = country;
    this.maxPerson = maxPerson;
  }
}
