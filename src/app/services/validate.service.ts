import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  private userUrl: string;
  private isValid: boolean = false;
  constructor(private http: HttpClient) {
    this.userUrl = `${API_URL}`
  }

  public isValidLogin(): Observable<boolean> {
    let token = localStorage.getItem('token')
    let username = localStorage.getItem('username')
    return this.http.get<boolean>(this.userUrl + '/validateLogin?token=' + token + '&username=' + username).pipe(map(data => {
        return data;
      }
    ))
  }


  public isValidLoginAdmin(): Observable<boolean> {
    let token = localStorage.getItem('token')
    let username = localStorage.getItem('username')
    return this.http.get<boolean>(this.userUrl + '/validateLoginAdmin?token=' + token + '&username=' + username).pipe(map(data => {

      this.isValid = data;
      return data;
    }))
  }

}
