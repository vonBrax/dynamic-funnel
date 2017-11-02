import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs/subject';
import 'rxjs/add/operator/takeUntil';

import { FunnelService } from '../../services/funnel.service';
import { MatStepper } from '@angular/material';

declare var lp;

@Component({
  selector: 'app-form-parent',
  templateUrl: './form-parent.component.html',
  styleUrls: ['./form-parent.component.css'],
  providers: [Location, {provide:LocationStrategy, useClass: PathLocationStrategy}, FunnelService ]
})
export class FormParentComponent implements OnInit, AfterViewInit, OnDestroy {

  funnelData: any;
  formParent: FormGroup;
  activeStep: number = 1;
  lastStep: number;
  ubForm: any;
  stepsArr: string[] = [];
  ready: boolean = false;
  isSelectClosed: boolean = true;

  // To deal with observable unsubscriptions
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @ViewChild('matStepper')
  matStepper: MatStepper;

  @ViewChild('ubFormContainer')
  ubFormContainer: ElementRef;

  constructor(private formService: FunnelService, private fb: FormBuilder, private location: Location ) { }

  ngOnInit() {
    this.initURL();
    this.formService.getJSON().then( data => {
      this.funnelData = data;
      this.formParent = this.fb.group({});
      this.lastStep = data.length;
      data.forEach(step => {
        this.stepsArr.push(step.name);
      })
      setTimeout(() => { 
      this.ready = true;
      this.getUnbounceForm();
    });
      this.onChanges();
    }).catch(err => console.log(err) );
  }

  ngAfterViewInit() {
    /* setTimeout(() => { 
      this.ready = true;
    }); */
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
        if( !this.matStepper || this.matStepper.selectedIndex === 0 || this.matStepper.selectedIndex === this.lastStep) {
          return;
        }
        this.moveToNextStep();
    });
  }

  createHiddenFields(form): void {
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
  }

  createSingleField(name: any, form: any, path?: any): void {
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
  }

  getUnbounceForm(): void {
    this.ubForm = this.ubFormContainer.nativeElement.querySelector('form');
    if(this.ubForm) {
      this.createHiddenFields(this.ubForm);
    } else {
      console.log('Unbounce form was not found....');
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
      lp.jQuery(this.ubForm).submit();
      //this.ubForm.submit();
    }
    
    console.log('Submiting form, sire!');
    console.log(JSON.stringify(form.value,null,2));
    console.log('Is valid??? --> ' + form.valid );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
