import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { FormSyncService } from '../../services/form-sync.service';

@Component({
  selector: 'app-form-hero',
  templateUrl: './form-hero.component.html',
  styleUrls: ['./form-hero.component.css']
})
export class FormHeroComponent implements OnInit {

/*   @Input()
  parentGroup: FormGroup; */

  @Input()
  data: any;

  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter<any>();

  stepGroup: FormGroup;

  constructor(private fb: FormBuilder, private formSyncService: FormSyncService ) { }

  ngOnInit() {
    this.stepGroup = this.fb.group({
      'height_unit': ['cm'],
      'weight_unit': ['kg'],
      'target_weight_unit': ['kg']
    });

     this.stepGroup.valueChanges.subscribe(val => {
      this.formSyncService.dataFlow.next(val);
    });
  }

  addControl(step: any): void {
    if (step.parent) {
      this.stepGroup.addControl(step.name, step.control);
      this.addControlEvent.emit({name: this.data.name, control: this.stepGroup});
    } else {
      this.addControlEvent.emit(step);
    }
  }

  goToFirstStep() {
    this.formSyncService.dataFlow.next('go to first step');
  }

}
