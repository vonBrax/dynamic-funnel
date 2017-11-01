import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.css']
})
export class FormStepComponent implements OnInit {

  @Input()
  parentGroup: FormGroup;

  @Input()
  data: any;

  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter();

  stepGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
   if(this.data.questions) {
    this.stepGroup = this.fb.group({});
    this.addControlEvent.emit({name: this.data.name, control: this.stepGroup});
    //this.parentGroup.addControl(this.data.name, this.stepGroup);
    }
  }

  addControl(step: any): void {
    if(step.parent) {
      this.stepGroup.addControl(step.name, step.control);
      this.addControlEvent.emit({name: this.data.name, control: this.stepGroup});
    } else {
      this.addControlEvent.emit(step);
    }
    
  }
}
