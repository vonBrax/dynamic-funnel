import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { Subject } from 'rxjs/subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';

import { MixpanelService } from '../../services/mixpanel.service';
import { FormSyncService } from '../../services/form-sync.service';
import { MatStepper } from '@angular/material';

import { bariatric } from '../../models/bariatric';

declare var lp;

@Component({
  selector: 'app-form-parent',
  templateUrl: './form-parent.component.html',
  styleUrls: ['./form-parent.component.css'],
  providers: [
    Location,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    MixpanelService
  ]
})
export class FormParentComponent implements OnInit, OnDestroy {

  funnelName = 'DE.Bariatrics:1.2';
  funnelData: any;
  formParent: FormGroup;
  activeStep = 1;
  lastStep = -1;
  ubForm: any;
  stepsArr: string[] = [];
  ready = false;
  isSelectClosed = true;
  stepsCompleted: number[] = [];
  userWentBack = false;
  valueHasChanged = false;
  hasTopForm = false;
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
    private mixpanelService: MixpanelService,
    private formSyncService: FormSyncService
  ) {}

  ngOnInit() {
    this.funnelData = bariatric;
    this.formParent = this.fb.group({});
    bariatric.forEach(step => {
      /* if( step.type === 'form_hero' ) {
        this.hasTopForm = true;
        this.topFormData = step;
      } */
      if (step.field === 'step' ) {
        this.stepsArr.push(step.name);
        this.lastStep++;
      }
    });

    setTimeout(() => {
      this.ready = true;
      this.getUnbounceForm();
      this.initURL();
      this.onStepperChange();
      this.formSyncService.dataFlow.subscribe(val => {
        if (val === 'go to first step') {
          this.goToFirstStep();
          return;
        }
        this.formParent.get('anthropometry').setValue(val);
      });
    });
    this.onChanges();
    this.mixpanelService.init(this.funnelName, this.stepsArr[0]);
  }

  addControl(step: any): void {
    this.formParent.addControl(step.name, step.control);
  }

  createHiddenFields(form: any): void {
    // Create hidden fields for available steps
    this.funnelData.forEach(step => {
      if (!step.field || step.field !== 'step') { return; }
      if (step.question) {
       this.createSingleField(step.name, form);
      } else if (step.questions) {
        step.questions.forEach(question => {
          this.createSingleField(question.name, form, step.name);

          // Hardcoded fix to create additional fields
          // for the intl-tel-input component
          if (question.name === 'phone_number') {
            this.createSingleField('intl_phone', form, step.name );
            this.createSingleField('phone_country', form, step.name );
          }
          if (question.button_toggle) {
            this.createSingleField(question.button_toggle.name, form, step.name);
          }
        });
      }
    });
    if (localStorage.getItem('jlp')) { this.createSingleField('jlp', form, null, localStorage.getItem('jlp')); }
  }

  createSingleField(name: any, form: any, path?: any, defaultValue?: any): void {
    if (!name || !form) {
      return;
    }
    const fieldSet = form.querySelector('.fields');
    const el = document.createElement('input');
    el.setAttribute('type', 'hidden' );
    el.setAttribute('class', 'hidden' );
    el.setAttribute('id', name);
    el.setAttribute('name', name);
    if (path) {
      el.setAttribute('data-path', path);
    }
    if (fieldSet) {
      fieldSet.appendChild(el);
    } else {
      form.appendChild(el);
    }
    if (defaultValue) {
      el.value = defaultValue;
    }
  }

  getUnbounceForm(): void {
    this.ubForm = this.ubFormContainer.nativeElement.querySelector('form');
    if (this.ubForm) {
      this.createHiddenFields(this.ubForm);
    } else {
      /* console.log('Form not found...'); */
    }
  }

  getStep(name: string): AbstractControl {
    if (this.ready) {
      return this.formParent.get(name);
    }
  }

  getStepByIndex(ind: number): string {
    return this.stepsArr[ind];
  }

  goToFirstStep() {
    let url = this.location.path();
    if (!/step=/.test(url)) {
      const hasParams = /\?/.test( url );
      const target = this.matStepper.selectedIndex + 1;
     /*  if( hasParams && /step=/.test(url) ) {
        url = url.replace(/step=[^&]+/, 'step='+target);
      }  */
      if (hasParams) {
        url += '&step=' + target;
      } else {
        url += '?step=' + target;
      }
       this.location.replaceState(url);
    }
    this.firstStep.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
    if (this.formParent.get(this.stepsArr[0]).valid) {
      this.moveToNextStep();
    }
  }

  initURL(): void {
    /* let url = this.location.path();
    let hasParams = /\?/.test( url );

    if( /step=/.test(url) ) {
      url = url.replace(/(\?|\&)?step=[^&]+/, '');
      if(url.startsWith('/&') || url.startsWith('&') ) {
        url = url.replace('&', '?');
      }
      this.location.replaceState(url);
    } */

    let url = this.location.path();
    const hasParams = /\?/.test( url );
    const first = this.activeStep;

    if ( hasParams && /step=/.test(url) ) {
      url = url.replace(/step=[^&]+/, 'step=' + first);
    } else if (hasParams) {
      url += '&step=' + first;
    } else {
      url += '?step=' + first;
    }
    this.location.replaceState(url);



    if (!hasParams) {
      this.createSingleField('error', this.ubForm, null, 'No parameters found in the url');
      return;
    }
    const params = url.slice(url.indexOf('?') + 1);
    const pairs = params.split('&');
    pairs.forEach(pair => {
      const _pairs = pair.split('=');
      this.createSingleField(_pairs[0], this.ubForm, null, _pairs[1]);
    });
    this.createSingleField('jlp', this.ubForm, url);


  }

  moveToNextStep(): void {
    const i = this.matStepper.selectedIndex;
    const currPos = window.scrollY;
    if ( this.formParent.get(this.stepsArr[i]).valid  && this.isSelectClosed) {
      setTimeout( () => {
        this.updateUrl(i + 1);
        this.matStepper.next();
        this.scrollToStep(i, i + 1);
      }, 300);
    }
  }

  onChanges(): void {
    this.formParent.valueChanges
      .takeUntil(this.ngUnsubscribe)
      .subscribe(val => {
        if (this.userWentBack) { this.valueHasChanged = true; }

        if (!this.matStepper || this.matStepper.selectedIndex === 0 || this.matStepper.selectedIndex === this.lastStep ) {
          return;
        }
        this.moveToNextStep();
    });
  }

  onStepperChange(): void {
     if (this.matStepper) {
      this.matStepper.selectionChange.subscribe( val => {
        const prev = val.previouslySelectedIndex,
          curr = val.selectedIndex;

        this.scrollToStep(prev, curr);
        // Value from last step
        let prevStepValue = this.formParent.get(this.stepsArr[prev]).value;
        // If value is an object, stringify it
        if (typeof(prevStepValue) === 'object') { prevStepValue = JSON.stringify(prevStepValue); }
        // If going back in the steps, no need to send another event
        if (curr < prev) {
          this.userWentBack = true;
          return;
        }
        if ( this.userWentBack && !this.valueHasChanged ) {
          return;
        } else {
          this.mixpanelService.step({
            step: curr + 1,
            name: this.stepsArr[curr],
            prevStepValue: (this.stepsArr[prev]) + ' - ' + prevStepValue
          });
          // Save to the step completed array
          this.stepsCompleted.push(prev);
          if (this.activeStep - this.stepsCompleted.length === 1) {
            this.userWentBack = false;
          }
          this.valueHasChanged = false;
        }
      });
    }
  }

  prepareUnbounceForm(form: FormGroup): void {
    const fieldsArr = Array.prototype.slice.call(this.ubForm.querySelectorAll('.fields input'));
    fieldsArr.forEach(field => {
      const path = field.dataset.path ? field.dataset.path + '.' + field.name : field.name;

      // Hardcoded fix to fill values for additional fields required by
      // intl-tel-input component
      switch (field.name) {
        case 'phone_country':
          const val = form.get('personal_information.countryControl').value;
          field.value = val.iso2 ? val.iso2 : val;
          break;
        case 'phone_number':
          field.value = form.get('personal_information.phoneNumberControl').value;
          break;
        case 'intl_phone':
          field.value = form.get('personal_information.hiddenPhoneNumberControl').value;
          break;
        default:
          field.value = form.get(path) ? form.get(path).value : null;
      }
    });
  }

  scrollToStep(curr: number, target: number) {
    const parentOffset = this.firstStep.nativeElement.offsetParent.offsetTop;
    const thisOffset = this.firstStep.nativeElement.offsetTop;
    const firstStepPos = parentOffset + thisOffset;
    window.scrollTo({left: 0, top: firstStepPos + target * 50, behavior: 'smooth' });
  }

  setSelectStatus(status: any): void {
    if (status.opened ) {
      this.isSelectClosed = false;
    } else if (status.closed) {
      this.isSelectClosed = true;
      this.moveToNextStep();
    }
  }

  updateUrl(activeStep: number): any {
    if (activeStep + 1 === this.activeStep) { return; }
    this.location.replaceState(this.location.path().replace(/step=[^&]+/, 'step=' + (activeStep + 1)) );
    this.activeStep = activeStep + 1;
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.prepareUnbounceForm(form);
      const len = this.stepsArr.length;
      this.mixpanelService.submit(this.formParent.get(this.stepsArr[len - 1]).value);
      lp.jQuery(this.ubForm).submit();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
