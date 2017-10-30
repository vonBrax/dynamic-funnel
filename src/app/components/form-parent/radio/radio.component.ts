import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  @Input()
  parentGroup: FormGroup;

  @Input()
  data: any;

  stepControl: FormControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.stepControl = this.createSingleControl(this.data.validators);
    this.parentGroup.addControl(this.data.name,this.stepControl);
  }

  createSingleControl(rules: any): FormControl {
    let validators: ValidatorFn[] = this.createValidators(rules);
    return this.fb.control('', Validators.compose(validators)) ;
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

}
