import {Component, OnInit} from '@angular/core';
import {User} from "../../classes/user";
import {Router} from "@angular/router";
import {AuthServiceService} from "../../services/auth-service.service";
import {ValidateService} from "../../services/validate.service";
import {Roles} from "../../classes/roles";

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isValidLog = false;
  isValidAdmin = false;
  user: User = new User('','','','', Roles.USER)
  roles: Role[] = [
    {value: '1', viewValue: 'ADMIN'},
    {value: '0', viewValue: 'USER'}
  ];

  constructor(private authService: AuthServiceService, private router:Router, public validateService:ValidateService) { }

  ngOnInit(): void {
    this.isValidLogin()
    this.isValidLoginAdmin()
  }

  onSubmit(): void {
    this.authService.register(this.user).subscribe(result => this.handleSuccesRegistration(), error => this.handleErrorRegistration(error))
  }

  handleSuccesRegistration(): void {
    this.router.navigate(['login'])
  }

  handleErrorRegistration(error: { error: { message: any; }; }): void {
    console.log(error.error.message)
  }

  public isValidLogin() {
    this.validateService.isValidLogin().subscribe(data => this.isValidLog = data, error => console.log("User Is Not Logged ind"))
  }

  public isValidLoginAdmin() {
    this.validateService.isValidLoginAdmin().subscribe(data => this.isValidAdmin = data, error => console.log("User Is Not Admin"))
  }

}