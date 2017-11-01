import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs/subject';
import 'rxjs/add/operator/takeUntil';

import { FunnelService } from '../../services/funnel.service';
import { MatStepper } from '@angular/material';

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
  stepsArr: string[] = [];
  ready: boolean = false;

  // To deal with observable unsubscriptions
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @ViewChild('matStepper')
  matStepper: MatStepper;

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
      this.onChanges();
    }).catch(err => console.log(err) );
  }

  ngAfterViewInit() {
    setTimeout(() => { 
      this.ready = true;
    });
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

  initURL() {
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

  onChanges(): void {
    this.formParent.valueChanges
      .takeUntil(this.ngUnsubscribe)
      .subscribe(val => {
        if( !this.matStepper || this.matStepper.selectedIndex === 0 || this.matStepper.selectedIndex === this.lastStep) {
          return;
        }
        console.log(this.matStepper.selectedIndex);
        let i = this.matStepper.selectedIndex;
        if ( this.formParent.get(this.stepsArr[i]).valid ) {
          setTimeout( () => {
            this.matStepper.next();
            this.updateUrl(i);
            window.scrollTo({ left: 0, top: (50*i), behavior: 'smooth' });
          }, 300)
        }
      })
  }

  updateUrl(activeStep: number):void {
    if(activeStep +1 === this.activeStep) { return };
    this.location.replaceState(this.location.path().replace(/step=[^&]+/, 'step='+(activeStep+1)) );
    this.activeStep = activeStep+1;
    window.scrollTo({ left: 0, top: 50*(activeStep+1), behavior: 'smooth' });
  }

  onSubmit(form:FormGroup):void {
    console.log('Submiting form, sire!');
    console.log(JSON.stringify(form.value,null,2));
    console.log('Is valid??? --> ' + form.valid );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
