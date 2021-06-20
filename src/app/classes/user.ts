import {Roles} from "./roles";

export class User {
  username: string;
  password: string;
  email: string;
  name: string;
  role: Roles;

  constructor(username: string, password: string, email: string, name: string, role: Roles) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.name = name;
    this.role = role;
  }
}
