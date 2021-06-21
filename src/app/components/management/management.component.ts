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

  username:string | null = '';
  usersList: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.usersList = data
      console.log(data)
    })
    this.username =  localStorage.getItem("username")
    this.usersList = this.usersList.filter(userToRemove => userToRemove.username !== this.username)
  }

  public deleteUser(user:User) {
    console.log(user)
    this.usersList = this.usersList.filter(userToRemove => userToRemove.username !== user.username)
    this.userService.deleteUser(user);
  }

}
