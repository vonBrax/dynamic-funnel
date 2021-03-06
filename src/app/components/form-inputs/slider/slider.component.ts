import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BmiCalculatorService } from '../../../services/bmi-calculator.service';
import { Utils } from '../../../models/utils';
import { Height } from '../../../models/height';
import { Weight } from '../../../models/weight';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {

  @Input()
  parentGroup: FormGroup;

  @Input()
  data: any;

  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter();

  controlName: string;
  sliderData: any;
  activeUnit: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  get formControl(): FormControl {
    return this.parentGroup.get(this.data.name) as FormControl;
  }

  constructor(private bmiCalculator: BmiCalculatorService ) { }

  ngOnInit() {
    if(this.data.name === 'height' ) {
      this.sliderData = new Height();
    } else if (this.data.name === 'weight') {
      this.sliderData = new Weight();
    } else {
      console.log('Could not match data for slider component...');
    }
    this.activeUnit = this.data.default;
    this.addControlEvent.emit({
      name: this.data.name,
      control: Utils.createSingleControl('', this.data.validators),
      parent: true
    });
    this.parentGroup.valueChanges
      .takeUntil(this.ngUnsubscribe)
      .subscribe(val => {
        this.bmiCalculator.sendBMI(val);
      }, err => console.log(err));
  }

  addControl(step): void {
    this.addControlEvent.emit(step);
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
    if(this.formControl.pristine) {
      return this.activeUnit;
    } else {
      return this.data.name === 'height' ? this.formatHeight(val) :
      (this.data.name === 'weight') ? this.formatWeight(val) :
        null;
    }
  }

  formatWeight(val: number): string {
    if(this.activeUnit === 'kg') {
      return val + ' kg';
    }
    let int = ~~(val / 14);
    let mod = val % 14;
    return mod === 0 ? `${int}st ` : `${int}st ${mod}lb`;
  }

  updateFormValue(val) {
    let obj = {};
    this.activeUnit = val;
    obj[this.data.name] = this.sliderData[this.activeUnit].default;
    this.parentGroup.patchValue(obj);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
