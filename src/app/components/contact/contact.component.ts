import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../classes/user";
import {Roles} from "../../classes/roles";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  user: User = new User('','','','', Roles.USER);
  name: string = '';
  email: string = '';
  username: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(result => this.handleSucces(result))
  }

  handleSucces(result: User) {
    this.name = result.name
    this.email = result.email
    this.username = result.username
  }

}
