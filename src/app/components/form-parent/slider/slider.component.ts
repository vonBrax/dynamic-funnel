import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Height } from '../../../models/height';
import { Weight } from '../../../models/weight';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  controlName: string;
  sliderData: any;
  //activeHeightUnit: string = 'cm';
  //activeWeightUnit: string = 'kg';
  activeUnit: string;
  unitFormControl;

  @Input()
  parentGroup: FormGroup;

  @Input()
  data: any;

  get formControl() {
    return this.parentGroup.get(this.data.name) as FormControl;
  }

  /* get unitFormControl() {
    console.log(this.parentGroup );
    return this.parentGroup.get(this.data.name + '_unit') as FormControl;
  }
 */
  constructor(private fb: FormBuilder) {
    
   }

  ngOnInit() {
    this.unitFormControl = this.data.name === 'height' ? { value: 'cm'} : {value: 'kg'};
    
    if(this.data.name === 'height' ) {
      this.sliderData = new Height();
    } else if (this.data.name === 'weight') {
      this.sliderData = new Weight();
    } else {
      console.log('Could not match data for slider component...');
    }
    this.activeUnit = this.data.default;
    console.log();
    this.parentGroup.addControl(this.data.name, this.createSingleControl(this.sliderData[this.activeUnit].default, this.data.validators) );
  }

  formatHeight(val: number): string {
    if (this.activeUnit === 'cm') {
      return val + ' cm';
    }
    let int = ~~(val / 12);
    let mod = val % 12;
    return mod === 0 ? `${int}ft ` :  `${int}ft ${mod}in`;
  }

  formatUnit(val: number) {
    return this.data.name === 'height' ? this.formatHeight(val) :
      (this.data.name === 'weight') ? this.formatWeight(val) :
        null;
  }

  formatWeight(val: number): string {
    if(this.activeUnit === 'kg') {
      return val + ' kg';
    }
    let int = ~~(val / 14);
    let mod = val % 14;
    return mod === 0 ? `${int}st ` : `${int}st ${mod}lb`;
  }

  createSingleControl(val:any, rules: any): FormControl {
    let validators: ValidatorFn[] = this.createValidators(rules);
    return this.fb.control(val, Validators.compose(validators)) ;
  }

  createValidators(rules: any): ValidatorFn[] {
    if(!rules) {
      return;
    }
    let arr = [];
    rules.forEach(rule => {
      arr.push(Validators[rule]);
    });
    return arr;
  }

  updateFormValue(val) {
    let obj = {};
    this.activeUnit = val;
    obj[this.data.name] = this.sliderData[this.activeUnit].default;
    this.parentGroup.patchValue(obj);
  }
  

}
