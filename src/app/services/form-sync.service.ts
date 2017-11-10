import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subscription } from 'rxjs/Subscription';
 
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class FormSyncService {

  dataFlow: BehaviorSubject<any> = new BehaviorSubject<any>({});
  
  constructor() {}
}
