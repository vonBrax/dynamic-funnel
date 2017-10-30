import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FunnelService {

  constructor(private http: HttpClient ) {}

  public getJSON(): Promise<any> {
    return this.http.get('./assets/bariatric.json').toPromise();
  }
}
