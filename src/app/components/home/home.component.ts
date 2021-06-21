import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private loggedIn: boolean;
  private userName: string;

  constructor(private authService: AuthServiceService, private router: Router) {
    this.loggedIn = authService.isUserLoggin()
    this.userName = authService.getUserInfo();
  }

  ngOnInit(): void {
  }

}
