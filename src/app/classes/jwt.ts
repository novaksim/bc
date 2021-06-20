import {User} from "./user";

export class Jwt {
  user: User;
  jwt: string;

  constructor(user: User, jwt: string) {
    this.user = user;
    this.jwt = jwt;
  }
}
