import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { BmicalculatorService } from '../../../services/bmicalculator.service';
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

  bmi: number = 0;
  subscription: Subscription;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder, private bmiCalculator: BmicalculatorService ) { }

  ngOnInit() {
    this.addControlEvent.emit({
      name: this.data.name,
      control: this.createSingleControl('', this.data.validators),
      parent: true
    });
    this.subscription = this.bmiCalculator.getBMI('toolbar')
      .takeUntil(this.ngUnsubscribe)
      .subscribe(val => {
        let newBmi = this.checkAndRound(val);
        if(this.bmi !== newBmi) {
          //this.parentGroup.get(this.data.name).patchValue(this.bmi);
          this.bmi = newBmi;
        }
        //this.parentGroup.get(this.data.name).setValue(this.bmi);
      }, err => console.log(err));

     this.parentGroup.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(val => {
       console.log(this.data.name, this.bmi);
        this.parentGroup.get(this.data.name).setValue(this.bmi);
     });
    //this.parentGroup.get(this.data.name).disable({onlySelf: true, emitEvent: true});
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

  checkAndRound(val: number): number {
    return (isFinite(val) && !isNaN(val)) ? Math.round(val*100)/100 : 0;  
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
