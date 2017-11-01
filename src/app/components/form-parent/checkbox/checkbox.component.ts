import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter();

  get checkbox() {
    return this.parentGroup.get(this.data.name);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addControlEvent.emit({
      name: this.data.name,
      control: this.createSingleControl(this.data.value, this.data.validators),
      parent: true
    });

    this.parentGroup.valueChanges.subscribe(val => {
      console.log(this.parentGroup.valid );
    });


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

  isInvalid() {
    if(this.checkbox.touched && this.checkbox.invalid) {
      return true;
    } else {
      return false;
    }
  }

}
