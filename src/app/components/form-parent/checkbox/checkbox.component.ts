import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input()
  parentGroup: FormGroup;

  @Input()
  data: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.parentGroup.addControl(this.data.name, this.createSingleControl(this.data.value,this.data.validators));
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

}
