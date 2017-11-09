import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { Subject } from 'rxjs/subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';

import { MixpanelService } from '../../services/mixpanel.service';
import { MatStepper } from '@angular/material';

import { bariatric } from '../../models/bariatric';

declare var lp;

@Component({
  selector: 'app-form-parent',
  templateUrl: './form-parent.component.html',
  styleUrls: ['./form-parent.component.css'],
  providers: [
    Location,
    {provide:LocationStrategy, useClass: PathLocationStrategy},
    MixpanelService
  ]
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
  hasTopForm: boolean = false;
  topFormData: any;

  // To deal with observable unsubscriptions
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @ViewChild('matStepper')
  matStepper: MatStepper;
  @ViewChild('ubFormContainer')
  ubFormContainer: ElementRef;
  @ViewChild('firstStep')
  firstStep: ElementRef;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private mixpanelService: MixpanelService
  ) {}

  ngOnInit() {
    this.funnelData = bariatric;
    this.formParent = this.fb.group({});
    // Last step needs to be -2, since the first step
    // in the funnel is not part of the matstepper,
    // thus is not taken into account
    this.lastStep = bariatric.length - 2;

    bariatric.forEach(step => {
      if( step.type === 'form_hero' ) {
        this.hasTopForm = true;
        this.topFormData = step;
      }
      if(!step.hero) {
        this.stepsArr.push(step.name);
      }
    });

    setTimeout(() => { 
      this.ready = true;
      this.getUnbounceForm();
      this.initURL();
      this.onStepperChange();
    });
    this.onChanges();
    this.mixpanelService.init(this.funnelName, this.stepsArr[0]);
  }

  addControl(step:any): void {
    this.formParent.addControl(step.name, step.control);
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
    if(localStorage.getItem('jlp')) { this.createSingleField('jlp', form, null, localStorage.getItem('jlp')); }
  }

  createSingleField(name: any, form: any, path?: any, defaultValue?: any): void {
    if(!name || !form) {
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
      /* console.log('Form not found...'); */
    }
  }

  getStep(name: string): AbstractControl {
    if(this.ready) {
      return this.formParent.get(name);
    }
  }

  getStepByIndex(ind: number): string {
    return this.stepsArr[ind];
  }

  goToFirstStep() {
    let url = this.location.path();
    if(!/step=/.test(url)) {
      let hasParams = /\?/.test( url );
      let target = this.matStepper.selectedIndex +1;
     /*  if( hasParams && /step=/.test(url) ) {
        url = url.replace(/step=[^&]+/, 'step='+target);
      }  */
      if (hasParams) {
        url += '&step=' + target;
      } else {
        url += '?step='+target;
      }
       this.location.replaceState(url);
    }
    this.firstStep.nativeElement.scrollIntoView({behavior: 'smooth', block:'start'});
  }

  initURL(): void {
    let url = this.location.path();
    let hasParams = /\?/.test( url );
    
    if( /step=/.test(url) ) {
      url = url.replace(/(\?|\&)?step=[^&]+/, '');
      if(url.startsWith('/&') || url.startsWith('&') ) {
        url = url.replace('&', '?');
      }
      this.location.replaceState(url);
    }


    if(!hasParams) {
      this.createSingleField('error', this.ubForm, null, 'No parameters found in the url');
      return;
    }
    let params = url.slice(url.indexOf('?') + 1);
    let pairs = params.split('&');
    pairs.forEach(pair => {
      let _pairs = pair.split('=');
      this.createSingleField(_pairs[0], this.ubForm, null, _pairs[1]);
    });
    this.createSingleField('jlp', this.ubForm, url);
  }

  moveToNextStep(): void {
    let i = this.matStepper.selectedIndex;
    let currPos = window.scrollY;
    if ( this.formParent.get(this.stepsArr[i]).valid  && this.isSelectClosed) {
      setTimeout( () => {
        this.matStepper.next();
        this.updateUrl(i + 1);
        this.scrollToStep(i, i + 1)
      }, 300)
    }
  }

  onChanges(): void {
    this.formParent.valueChanges
      .takeUntil(this.ngUnsubscribe)
      .subscribe(val => {
        if(this.userWentBack) { this.valueHasChanged = true; }
        if( val.anthropometry.originatedFromHero || !this.matStepper ||  /* this.activeStep === 1  || */  this.matStepper.selectedIndex === this.lastStep ) {
          val.anthropometry.originatedFromHero ? delete val.anthropometry.originatedFromHero : null;
          return;
        }
        this.moveToNextStep();
    });
  }

  onStepperChange(): void {
     if (this.matStepper) {
      this.matStepper.selectionChange.subscribe( val => {
        let prev = val.previouslySelectedIndex,
          curr = val.selectedIndex;
        this.scrollToStep(prev, curr);
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

  prepareUnbounceForm(form: FormGroup): void {
    let fieldsArr = Array.prototype.slice.call(this.ubForm.querySelectorAll('fieldset input'));
    fieldsArr.forEach(field => {
      let path = field.dataset.path ? field.dataset.path + '.' + field.name : field.name;
      if(form.get(path)) {
        field.value = form.get(path).value;
      } 
    });
  }

  scrollToStep(curr: number, target: number) {
    let currPos = window.scrollY;
    window.scrollTo({left: 0, top: currPos + ((target - curr) * 50), behavior: 'smooth' })
  }

  setSelectStatus(status: any): void {
    if(status.opened ) {
      this.isSelectClosed = false;
    } else if (status.closed) {
      this.isSelectClosed = true;
      this.moveToNextStep();
    }
  }

  updateUrl(activeStep: number):any {
    if (activeStep + 1 === this.activeStep) { return };
    this.location.replaceState(this.location.path().replace(/step=[^&]+/, 'step='+(activeStep+1)) );
    this.activeStep = activeStep+1; 
  }

  onSubmit(form:FormGroup):void {
    if(form.valid) {
      this.prepareUnbounceForm(form);
      let len = this.stepsArr.length;
      this.mixpanelService.submit(this.formParent.get(this.stepsArr[len - 1]).value)
      lp.jQuery(this.ubForm).submit();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
