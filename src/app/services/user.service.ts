import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../classes/user";
import {Observable} from "rxjs";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthServiceService} from "./auth-service.service";
import {ValidateService} from "./validate.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{
  private userUrl: string;

  constructor(private http: HttpClient, private router: Router,
              private authService: AuthServiceService,
              private valid:ValidateService) {
    this.userUrl = 'http://localhost:8080'
  }

  public getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/getAllUsers');
  }

  public deleteUser(user:User) {
    this.http.delete(this.userUrl + '/deleteUser/' + user.username).subscribe()
  }

  public getUserInfo(): Observable<User> {
    return this.http.post<User>(this.userUrl + '/getUserInfo', localStorage.getItem("username"));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.valid.isValidLogin().pipe(map(data => {
        return data;
      }
    ))
  }

}
