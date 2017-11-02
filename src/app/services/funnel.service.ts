import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class FunnelService {

  constructor(private http: HttpClient ) {}

  public getJSON(): Promise<any> {
    //return this.http.get('./assets/bariatric.json').toPromise();
    //return this.http.get('https://simple-server-endpoint.herokuapp.com/api/get').toPromise();
    return this.http.get(environment.jsonUrl).toPromise();
  }
}
