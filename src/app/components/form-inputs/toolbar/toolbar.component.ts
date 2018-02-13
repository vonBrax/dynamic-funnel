import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BmiCalculatorService } from '../../../services/bmi-calculator.service';
import { Utils } from '../../../models/utils';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: []
})
export class ToolbarComponent implements OnInit, OnDestroy {

  @Input()
  parentGroup: FormGroup;
  @Input()
  data: any;
  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter();

  bmi = 0;
  subscription: Subscription;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor( private bmiCalculator: BmiCalculatorService, private utils: Utils ) { }

  ngOnInit() {
    this.addControlEvent.emit({
      name: this.data.name,
      control: this.utils.createSingleControl('', this.data.validators),
      parent: true
    });
    this.subscription = this.bmiCalculator.getBMI()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(val => {
        if (this.bmi !== val) {
            this.bmi = val;
            this.parentGroup.patchValue({bmi: this.bmi});
        }
      }, err => console.log(err));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
