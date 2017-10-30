import { Component, OnInit, Input } from '@angular/core';
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

  stepGroup: FormGroup;
  //stepControl: FormControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
   if(this.data.questions) {
    this.stepGroup = this.fb.group({});
    this.parentGroup.addControl(this.data.name, this.stepGroup);
    }
  }

  /* createMultiControls(): FormGroup {
    let group: FormGroup = this.fb.group({});
    this.data.questions.forEach(question => { 
      group.addControl(question.name, this.createSingleControl(question.validators) )
    });
    return group;
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
 */
}
