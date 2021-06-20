import { Component, OnInit } from '@angular/core';
import {Offer} from "../../classes/offer";
import {User} from "../../classes/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  usersList: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.usersList = data
      console.log(data)
    })
  }

}
