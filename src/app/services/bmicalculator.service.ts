import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BmicalculatorService {

  private subject = new BehaviorSubject<any>(0);

  constructor() { }

  private calcBMI(data: any): number {
    let BMI: number;
    let isMixed: boolean = false;
    switch(data.height_unit) {
      case 'cm':
        isMixed = data.weight_unit !== 'kg' ? true : false;
        break;
      
      case 'in':
        isMixed = data.weight_unit !== 'lb' ? true : false;
        break;
    }
    data = isMixed ? this.toInternationalSystem(data) : data;
    BMI = (data.weight * 10000) / (data.height * data.height);
    if(!isMixed && data.height_unit === 'in') {
      BMI *= 0.0703;
    }
    return (isFinite(BMI) && !isNaN(BMI)) ? Math.round(BMI*100)/100 : 0;  ;
  }

  private toInternationalSystem(data):any {
    if (data.weight_unit === 'kg' && data.height_unit === 'cm' ) {
      return data;
    }
    if(data.weight_unit === 'lb') {
      data.weight = data.weight * 0.45;
    }
    if(data.height_unit === 'in') {
      data.height *= 2.54;
    }
    return data;
  }


  sendBMI(data: any) {
    let copy = {};
    Object.assign(copy, data);
    let bmi = this.calcBMI(copy);
    this.subject.next(bmi);
    data.bmi = bmi;
  }

  getBMI(): Observable<any> {
    return this.subject.asObservable();
  }

}
