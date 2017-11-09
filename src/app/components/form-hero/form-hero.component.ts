import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-hero',
  templateUrl: './form-hero.component.html',
  styleUrls: ['./form-hero.component.css']
})
export class FormHeroComponent implements OnInit {

  @Input()
  parentGroup: FormGroup;
  @Input()
  data: any;
  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  goToFirstStepEvent: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  stepGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.stepGroup = this.fb.group({
      'height_unit': ['cm', Validators.required],
      'weight_unit': ['kg', Validators.required],
      'target_weight_unit': ['kg', Validators.required]
    });
    this.stepGroup.valueChanges.subscribe(val => {
      val.originatedFromHero = true;
    });
  }

  addControl(step: any): void {
    if(step.parent) {
      this.stepGroup.addControl(step.name, step.control);
      this.addControlEvent.emit({name: this.data.name, control: this.stepGroup});
    } else {
      this.addControlEvent.emit(step);
    } 
  }

  goToFirstStep() {
    if(this.stepGroup.invalid) {
      for(var k in this.stepGroup.controls) {
       this.stepGroup.controls[k].markAsTouched();
      }
      return;
    }
    this.goToFirstStepEvent.emit();
  }

}
