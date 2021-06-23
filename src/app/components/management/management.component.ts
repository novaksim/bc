import {Component, OnInit} from '@angular/core';
import {User} from "../../classes/user";
import {UserService} from "../../services/user.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserDetailsComponent} from "../user-details/user-details.component";
import {Roles} from "../../classes/roles";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  username:string | null = '';
  usersList: User[] = [];

  constructor(private userService: UserService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.usersList = data
    })
    this.username =  localStorage.getItem("username")
    this.usersList = this.usersList.filter(userToRemove => userToRemove.username !== this.username)
  }

  public deleteUser(user:User) {
    this.usersList = this.usersList.filter(userToRemove => userToRemove.username !== user.username)
    this.userService.deleteUser(user);
  }

  openModal(user: User): void {
    const modalRef = this.modalService.open(UserDetailsComponent)
    modalRef.componentInstance.user = user;
    this.usersList.every(user => {
      if (user.role === 0) {
        user.role = Roles.USER
      } else if (user.role === 1) {
        user.role = Roles.ADMIN
      }
    })
  }

}
