import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms'; 

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.css']
})
export class ButtonToggleComponent implements OnInit {

  @Input()
  parentGroup: FormGroup;
  @Input()
  data: any;
  @Output()
  buttonToggleEvent = new EventEmitter();

  get formControl() {
    return this.parentGroup.get(this.data.name);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.parentGroup.addControl(this.data.name, this.createSingleControl(this.data.validators) );
    this.onChanges();
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

  onChanges() {
    this.formControl.valueChanges.subscribe(val => {
      this.buttonToggleEvent.emit(val);
    });
  }

  updateFormValue(): void {
    //this.parentGroup.patchValue({height: this.height[this.activeHeightUnit].default });
    //this.buttonToggleEvent.emit({controlName: this.data.name, defaultValue: this.data.default});
  }

}
