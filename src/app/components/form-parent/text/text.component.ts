import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  @Input()
  data: any;

  @Input()
  parentGroup: FormGroup;

  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addControlEvent.emit({name: this.data.name, control:  this.createSingleControl('', this.data.validators ), parent: true });
    //this.parentGroup.addControl(this.data.name, this.createSingleControl('', this.data.validators) )
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

  selectErrorMessage() {
    return ( this.parentGroup.get(this.data.name).hasError('email') &&
              !this.parentGroup.get(this.data.name).hasError('required')) ?
                'Please enter a valid email address' :
                  this.data.error_message;
  }

}
