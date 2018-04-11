import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { IpInfoCallback } from '../models/country.class';
import { environment } from '../../environments/environment.prod';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DataService {

  public userIp: string;
  public userCountry: string;
  public ipInfo$: BehaviorSubject<IpInfoCallback> = new BehaviorSubject<IpInfoCallback>(null);

  constructor(private http: HttpClient) {
      this.getIpInfo();
  }

  getIpInfo(): void {
    this.http
      .jsonp(environment.ipInfoUrl + '?callback=JSONP_CALLBACK', 'callback')
      .subscribe( (response: IpInfoCallback) => {
        this.ipInfo$.next(response);
        this.userIp = response.ip;
        this.userCountry = response.country;
      });
  }

  getJson(url: string): Promise<any> {
    return this.http.get(url).toPromise();
  }

  getJsonp(url: string): Promise<any> {
    return this.http.jsonp(url + '?callback=JSONP_CALLBACK', 'callback' ).toPromise();
  }
}
