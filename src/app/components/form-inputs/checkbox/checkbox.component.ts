import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Utils } from '../../../models/utils';

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

  get formControl(): FormControl {
    return this.parentGroup.get(this.data.name) as FormControl;
  }

  constructor() { }

  ngOnInit() {
    this.addControlEvent.emit({
      name: this.data.name,
      control: Utils.createSingleControl(this.data.value, this.data.validators),
      parent: true
    });
  }

  isInvalid() {
    if(this.formControl.touched && this.formControl.invalid) {
      return true;
    } else {
      return false;
    }
  }
}
