import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Offer} from "../classes/offer";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private readonly url: string;

  constructor(private http: HttpClient, private router:Router) {
    this.url = 'http://localhost:8080'
  }

  getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.url + '/offer/getAllOffers', { params: { intercept: true } })
  }

  getPictureById(pictureId: string): Observable<any> {
    return this.http.get<any>(this.url + '/offer/getPictureById/' + pictureId, { params: { intercept: true }}).pipe(map(picture => {
      return picture;
    }))
  }

  addOffer(offer: Offer, picture: any) {
    return this.http.post<Offer>(this.url + '/offer/addOffer', offer).subscribe(data => {
      this.router.navigate(['offers'])
    })
  }

  deleteOfer(id:number) {
    this.http.delete(this.url + '/offer/delleteOffer/' + id).subscribe(data => console.log("delete" + id))
  }

  getOfferByName(name: string): Observable<Offer> {
    return this.http.get<Offer>(this.url + '/offer/getOfferByName?name=' + name);
  }

}
