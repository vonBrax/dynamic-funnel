import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.css']
})
export class ButtonToggleComponent implements OnInit, OnDestroy {

  @Input()
  parentGroup: FormGroup;
  @Input()
  data: any;
  @Output()
  buttonToggleEvent: EventEmitter<MouseEvent|KeyboardEvent> = new EventEmitter();
  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter();

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  get formControl() {
    return this.parentGroup.get(this.data.name);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addControlEvent.emit({
      name: this.data.name,
      control: this.createSingleControl(this.data.default, this.data.validators),
      parent: true
    });
    this.onChanges();
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

  onChanges() {
    this.formControl.valueChanges
      .takeUntil(this.ngUnsubscribe)
      .subscribe(val => {
        this.buttonToggleEvent.emit(val);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
