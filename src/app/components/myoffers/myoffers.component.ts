import { Component, OnInit } from '@angular/core';
import {Offer} from "../../classes/offer";
import {OfferService} from "../../services/offer.service";
import {UserService} from "../../services/user.service";
import {User} from "../../classes/user";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Picture} from "../../classes/picture";

@Component({
  selector: 'app-myoffers',
  templateUrl: './myoffers.component.html',
  styleUrls: ['./myoffers.component.css']
})
export class MyoffersComponent implements OnInit {
  selectedFile = null;
  myOffer: Offer = new Offer('', '', '',0, '');

  constructor(private offerService: OfferService,
              private userService: UserService,
              private router: Router,
              private http: HttpClient) {
    this.userService.getUserInfo().subscribe(data => this.handeSuccessUserDta(data))

  }

  ngOnInit(): void {
  }

  onSubmit() {
    const fd = new FormData();
    // @ts-ignore
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post<Picture>('http://localhost:8080/offer/uploadImage', fd).subscribe(result => {
        this.myOffer.picture = result.id
        this.offerService.addOffer(this.myOffer, this.myOffer.picture)
      }, error => {
        this.myOffer.picture = error.error.text
        this.offerService.addOffer(this.myOffer, this.myOffer.picture)
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  handeSuccessUserDta(data: User) {
    this.myOffer.user = data
  }
}
