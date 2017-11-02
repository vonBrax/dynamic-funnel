import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input()
  parentGroup: FormGroup;

  @Input()
  data: any;

  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  selectOpenedOrClosedEvent: EventEmitter<any> = new EventEmitter<any>();

  stepControl: FormControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.stepControl = this.createSingleControl(this.data.validators);
    //this.parentGroup.addControl(this.data.name,this.stepControl);
    this.addControlEvent.emit({name: this.data.name, control: this.stepControl});
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

  selectOpened() {
    this.selectOpenedOrClosedEvent.emit({opened: true, closed: false})
  }

  selectClosed() {
    this.selectOpenedOrClosedEvent.emit({opened: false, closed: true });
  }

}
