import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Height } from '../../models/height';
import { Weight } from '../../models/weight';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {
  @Input() stepData: any;
  @Input() parentGroup: FormGroup;
  @Input() index: number;
  childGroupName: string;
  activeHeightUnit: string = "cm";
  activeWeightUnit: string = "kg";
  bmi: number;
  height = new Height();
  weight = new Weight();

  constructor() { }

  ngOnInit() {
    this.onChanges();
  }

  calcBMI(data: any): number {
    let BMI: number;
    let isMixed: boolean = false;
    switch(this.activeHeightUnit) {
      case 'cm':
        isMixed = this.activeWeightUnit !== 'kg' ? true : false;
        break;
      
      case 'in':
        isMixed = this.activeWeightUnit !== 'lb' ? true : false;
        break;
    }
    data = isMixed ? this.toInternationalSystem(data) : data;
    BMI = (data.weight * 10000) / (data.height * data.height);
    if(!isMixed && this.activeHeightUnit === 'in') {
      BMI *= 0.0703;
    }
    return BMI;
  }

  formatErrorMessage(question: string, el: string): string { 
    return this.parentGroup.get(this.childGroupName).get(el).hasError('required') ? 'Please tell us your ' + question.toLowerCase() :
      this.parentGroup.get(this.childGroupName).get(el).hasError('email') ? 'Please enter a valid email address' :
        '';
  }

  formatHeight(val: number): string {
    if (this.activeHeightUnit === 'cm') {
      return val + ' cm';
    }
    let int = ~~(val / 12);
    let mod = val % 12;
    return mod === 0 ? `${int}ft ` :  `${int}ft ${mod}in`;
  }

  formatWeight(val: number): string {
    if(this.activeWeightUnit === 'kg') {
      return val + ' kg';
    }
    let int = ~~(val / 14);
    let mod = val % 14;
    return mod === 0 ? `${int}st ` : `${int}st ${mod}lb`;
  }

  formatQuestion(question:string): string {
    return question.trim().toLowerCase().replace(/\s/g, '_');
  }

  setChildGroup(name: string): string {
    this.childGroupName = name;
    return name;
  }

  textInput(type: string): boolean {
    return (type === 'text' || type==="tel" || type === 'email');
  }

  textOrTel(type: string): string {
    if (type==='tel') return 'tel';
    else return 'text';
  }

  toggleActiveHeightUnit(event: KeyboardEvent): void {
    if (event.which < 37 || event.which > 40 ) {
      return;
    }
    this.activeHeightUnit = this.activeHeightUnit === 'cm' ? 'in' : 'cm';
  }

  toggleActiveWeightUnit(event: KeyboardEvent): void {
    if (event.which < 37 || event.which > 40 ) {
      return;
    }
    this.activeWeightUnit = this.activeWeightUnit === 'kg' ? 'lb' : 'kg';
  }

  toInternationalSystem(data):any {
    if (this.activeWeightUnit === 'kg' && this.activeHeightUnit === 'cm' ) {
      return data;
    }
    if(this.activeWeightUnit === 'lb') {
      data.weight = data.weight * 0.45;
    }
    if(this.activeHeightUnit === 'in') {
      data.height *= 2.54;
    }
    return data;
  }

  onChanges() {
    if(this.parentGroup && this.parentGroup.get('step1')) {
      this.parentGroup.get('step1').valueChanges.subscribe(val => {
       this.bmi = Math.round( this.calcBMI({weight: val.weight, height: val.height}) * 100 ) / 100;
      });
    
    }
  }

  updateFormValue(el: string): void {
    if(el === 'height') {
      this.parentGroup.get('step1').patchValue({height: this.height[this.activeHeightUnit].default });
    } else if (el === 'weight') {
      this.parentGroup.get('step1').patchValue({weight: this.weight[this.activeWeightUnit].default });
    }
  }

}


