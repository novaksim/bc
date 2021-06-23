import {Injectable} from '@angular/core';
import {User} from "../classes/user";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {API_URL} from "../app.constants";
import {AuthUser} from "../classes/auth-user";
import {map} from "rxjs/operators";
import {Jwt} from "../classes/jwt";


export class AuthenticationBean {
  constructor(private message: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private userUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.userUrl = `${API_URL}`
  }

    public register(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl + '/register', user, { params: { intercept: true } })
  }

  public getToken(): string {
    return <string>localStorage.getItem('token');
  }

  public getUserInfo(): string {
    return <string>localStorage.getItem('username');
  }

  public verifyUser(user: AuthUser): Observable<Jwt> {
    return this.http.post<Jwt>(this.userUrl + '/authenticate', user, { params: { intercept: true } }).pipe(map(input => {
      return input;
    }));
  }

  public logout() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  }

  isUserLoggin(): boolean {
    return sessionStorage.getItem('username') !== ''
  }

  isUserLogginAsdmin(): boolean {
    return localStorage.getItem('successLogin') === 'true' && sessionStorage.getItem('role') === 'admin'
  }

  getUserRole(username: string) {
    return this.http.get(this.userUrl + '/hello')
  }

  updateRole(username: string, role: string) {
    this.http.put(this.userUrl + '/user/' + username + '/role', role).subscribe(input => {
      console.log(input)
    });
  }

  public basicAuth(username: string, password: string,) {

    this.http.get<AuthenticationBean>(`http://localhost:8080/auth/basicAuth`)
  }

}
