import {Component, Input, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../classes/user";
import {Roles} from "../../classes/roles";
import {AuthServiceService} from "../../services/auth-service.service";
import {ManagementComponent} from "../management/management.component";
import {Router, RouterLink} from "@angular/router";

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User = new User('', '', '', '', Roles.USER)
  roles: Role[] = [
    {value: '1', viewValue: 'ADMIN'},
    {value: '0', viewValue: 'USER'}
  ];

  constructor(private authService: AuthServiceService,
              public activeModal: NgbActiveModal,
              private router:Router) {
  }

  ngOnInit(): void {
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(value: any) {
    if (value === "0") {
      this.user.role = Roles.USER;
    } else if (value === "1") {
      this.user.role = Roles.ADMIN;
    }
    this.authService.updateRole(this.user.username, value);
    this.activeModal.close("Submit");
    window.location.reload()
    // this.user.role =
  }
}
