import {Component, NgZone, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../classes/user";
import {Router} from "@angular/router";
import {AuthServiceService} from "../../services/auth-service.service";
import {AuthUser} from "../../classes/auth-user";
import {Jwt} from "../../classes/jwt";
import {Roles} from "../../classes/roles";
import {ValidateService} from "../../services/validate.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User('', '', '', '', Roles.USER)
  jwt: Jwt = new Jwt(this.user, "")
  successLogin: boolean = false;

  constructor(private zone:NgZone, private userService: UserService, private router: Router, private authService: AuthServiceService,
              private validate:ValidateService) {
  }

  ngOnInit(): void {
    this.validate.isValidLogin().subscribe(data => {
      if (data) {
        this.router.navigate(['home'])
      }
    })
  }

  onSubmit() {
    this.authService.verifyUser(new AuthUser(this.user.username, this.user.password)).subscribe(result => this.handleSucess(result), error => this.errorHandle(error))
  }

  handleSucess(result: Jwt) {
    if (result != null) {
      this.jwt = result;
      this.successLogin = true;
      localStorage.setItem('token', this.jwt.jwt);
      localStorage.setItem('username', this.user.username);
      localStorage.setItem('role', this.jwt.user.role.toString());
      sessionStorage.setItem('successLogin', 'true');

      this.authService.getUserRole(this.user.username).subscribe(data => this.handleSuccesGetRole(data),
        error => sessionStorage.setItem('role', error.error.text))
      this.zone.run(() => {
        this.router.navigateByUrl('/home')
        window.location.reload();
      })
     // this.router.navigate(['/home']).then(window.location.reload)
    } else {
      alert("Bad credentials");
      this.user.password = ''
    }
  }

  errorHandle(error: { error: { message: any; }; }): void {
    sessionStorage.setItem('successLogin', 'false');
    this.successLogin = false;
    alert("Bad credentials");
  }

  handleSuccesGetRole(data: Object) {
  }


}
