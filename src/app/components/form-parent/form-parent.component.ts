import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { Subject } from 'rxjs/subject';
import 'rxjs/add/operator/takeUntil';

import { MixpanelService } from '../../services/mixpanel.service';
import { MatStepper } from '@angular/material';

import { bariatric } from '../../models/bariatric';

declare var lp;

@Component({
  selector: 'app-form-parent',
  templateUrl: './form-parent.component.html',
  styleUrls: ['./form-parent.component.css'],
  providers: [Location, {provide:LocationStrategy, useClass: PathLocationStrategy}, MixpanelService ]
})
export class FormParentComponent implements OnInit, OnDestroy {

  funnelName: string = 'EN.Bariatrics:1.2';
  funnelData: any;
  formParent: FormGroup;
  activeStep: number = 1;
  lastStep: number;
  ubForm: any;
  stepsArr: string[] = [];
  ready: boolean = false;
  isSelectClosed: boolean = true;
  stepsCompleted: number[] = [];
  userWentBack: boolean = false;
  valueHasChanged: boolean = false;

  // To deal with observable unsubscriptions
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @ViewChild('matStepper')
  matStepper: MatStepper;

  @ViewChild('ubFormContainer')
  ubFormContainer: ElementRef;

  constructor(private fb: FormBuilder, private location: Location, private mixpanelService: MixpanelService ) { }

  ngOnInit() {
    this.initURL();
      this.funnelData = bariatric;
      this.formParent = this.fb.group({});
      this.lastStep = bariatric.length - 1;
      bariatric.forEach(step => {
        this.stepsArr.push(step.name);
      })
      setTimeout(() => { 
        this.ready = true;
        this.getUnbounceForm();
        this.onStepperChange();
      });
      this.onChanges();
      this.mixpanelService.init(this.funnelName, this.stepsArr[0]);
  }

onStepperChange(): void {
     
     if (this.matStepper) {
      this.matStepper.selectionChange.subscribe( val => {
        let prev = val.previouslySelectedIndex,
          curr = val.selectedIndex;
        // Value from last step
        let prevStepValue = this.formParent.get(this.stepsArr[prev]).value;
        // If value is an object, stringify it
        if (typeof(prevStepValue) === 'object') { prevStepValue = JSON.stringify(prevStepValue);}
        // If going back in the steps, no need to send another event
        if( curr < prev ) {
          this.userWentBack = true;
          return;
        }
        if ( this.userWentBack && !this.valueHasChanged ) {
          return;
        } else {
          this.mixpanelService.step({
            step: curr + 1,
            name: this.stepsArr[curr],
            prevStepValue: (this.funnelData[prev].question || this.funnelData[prev].label) + ' - ' + prevStepValue
          });
          // Save to the step completed array
          this.stepsCompleted.push(prev);
          if( this.activeStep - this.stepsCompleted.length === 1 ) {
            this.userWentBack = false;
          }
          this.valueHasChanged = false;
        }
      });
    } 
  }

  addControl(step:any): void {
    this.formParent.addControl(step.name, step.control);
  }

  getStep(name: string): AbstractControl {
    if(this.ready) {
      return this.formParent.get(name);
    }
  }

  getStepByIndex(ind: number): string {
    return this.stepsArr[ind];
  }

  initURL(): void {
    let url = this.location.path();
    let hasParams = /\?/.test( url );
    let first = this.activeStep;
    
    if( hasParams && /step=/.test(url) ) {
      url = url.replace(/step=[^&]+/, 'step='+first);
    } else if (hasParams) {
      url += '&step='+first;
    } else {
      url += '?step='+first;
    }
    this.location.replaceState(url);
  }

  moveToNextStep(): void {
    let i = this.matStepper.selectedIndex;
    if ( this.formParent.get(this.stepsArr[i]).valid  && this.isSelectClosed) {
      setTimeout( () => {
        this.matStepper.next();
        this.updateUrl(i + 1);
        window.scrollTo({ left: 0, top: 50*(i+1), behavior: 'smooth' });
      }, 300)
    }
  }

  onChanges(): void {
    this.formParent.valueChanges
      .takeUntil(this.ngUnsubscribe)
      .subscribe(val => {
        if(this.userWentBack) { this.valueHasChanged = true; }
        if( !this.matStepper || this.matStepper.selectedIndex === 0 || this.matStepper.selectedIndex === this.lastStep) {
          return;
        }
        this.moveToNextStep();
    });
  }

  createHiddenFields(form: any): void {
    // Create hidden fields for available steps
    this.funnelData.forEach(step => {
      if(step.question) {
       this.createSingleField(step.name, form);
      } else if (step.questions) {
        step.questions.forEach(question => {
          this.createSingleField(question.name, form, step.name);
          if(question.button_toggle) {
            this.createSingleField(question.button_toggle.name, form, step.name);
          }
        });
      }
    });
    // Check for lp url (debugging purposes) and utm/gclid parameters in the localstorage
    if(localStorage.getItem('jutm')) {
      let utms = localStorage.getItem('jutm').split(',');
      utms.forEach(utm => {
        let [name, value] = utm.split('=');
        this.createSingleField(name, form, null, value);
      });
    }
    if(localStorage.getItem('jlp')) { this.createSingleField('jlp', form, null, localStorage.getItem('jlp')); }
  }

  createSingleField(name: any, form: any, path?: any, defaultValue?: any): void {
    if(!name) {
      return;
    }
    let fieldSet = form.querySelector('fieldset');
    let el = document.createElement('input');
    el.setAttribute('type','hidden' );
    el.setAttribute('class','hidden' );
    el.setAttribute('id', name);
    el.setAttribute('name', name);
    if(path) {
      el.setAttribute('data-path', path);
    }
    if(fieldSet) {
      fieldSet.appendChild(el);
    } else {
      form.appendChild(el);
    }
    if(defaultValue) {
      el.value = defaultValue;
    }
  }

  getUnbounceForm(): void {
    this.ubForm = this.ubFormContainer.nativeElement.querySelector('form');
    if(this.ubForm) {
      this.createHiddenFields(this.ubForm);
    } else {
      //console.log('Form was not found....');
    }
  }

  prepareUnbounceForm(form: FormGroup): void {
    let fieldsArr = Array.prototype.slice.call(this.ubForm.querySelectorAll('fieldset input'));
    fieldsArr.forEach(field => {
      let path = field.dataset.path ? field.dataset.path + '.' + field.name : field.name;
      if(form.get(path)) {
        field.value = form.get(path).value;
      } 
    });
  }

  setSelectStatus(status: any): void {
    if(status.opened ) {
      this.isSelectClosed = false;
    } else if (status.closed) {
      this.isSelectClosed = true;
      this.moveToNextStep();
    }
  }

  updateUrl(activeStep: number):void {
    if(activeStep + 1 === this.activeStep) { return };
    this.location.replaceState(this.location.path().replace(/step=[^&]+/, 'step='+(activeStep+1)) );
    this.activeStep = activeStep+1;
    window.scrollTo({ left: 0, top: 50*(activeStep+1), behavior: 'smooth' });
  }

  onSubmit(form:FormGroup):void {
    if(form.valid) {
      this.prepareUnbounceForm(form);
      this.mixpanelService.submit(this.formParent.get(this.stepsArr[this.lastStep]).value)
      lp.jQuery(this.ubForm).submit();
     
    }
    //TODOS: CHECK IF WE ARE GOING TO NEED USER INFO
    // ON TY PAGE AND SAVE IT TO LS
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
