import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {ValidateService} from "../../services/validate.service";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public loggedIn: boolean;
  public userName: string;
  public isAdmin: boolean = false;

  constructor(public authService: AuthServiceService,
              private validateService: ValidateService,
              private route:ActivatedRoute) {
    this.loggedIn = false;
    this.userName = '';

    route.params.subscribe(value => {
      this.validateService.isValidLogin().subscribe(data => this.handleSuccessLogin(data))
      // this.userName = this.authService.getUserInfo();
      this.validateService.isValidLoginAdmin().subscribe(data => this.handleSuccess(data));
    });
  }

  ngOnInit(): void {}

  private handleSuccessLogin(data: boolean) {
    this.loggedIn = data;
  }

  private handleSuccess(data: boolean) {
    this.isAdmin = data
  }

}
