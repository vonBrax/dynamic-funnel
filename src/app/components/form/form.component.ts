import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { MatStepper } from '@angular/material';
import { Bariatric } from '../../models/bariatric';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [Location, {provide:LocationStrategy, useClass: PathLocationStrategy}, FormService ]
})
export class FormComponent implements OnInit, AfterViewInit {
  
  formGroup: FormGroup;
  private activeStep: number = 1;
  private initDone: boolean = false;
  private bariatric: Bariatric;
  //private funnelData$: Observable<any>;

  get formArray() { return this.formGroup.get('formArray'); }

  constructor(private fb: FormBuilder,
              private location: Location,
              private formService: FormService ) { }

  @ViewChild('matStepper') matStepper: MatStepper

  ngAfterViewInit() {
    if(this.initDone) { return; }
    let url = this.location.path();
    let hasParams = /\?/.test( url );
    //this.activeStep = this.matStepper.selectedIndex+1;
    this.activeStep = 1;
    
    if( hasParams && /step=/.test(url) ) {
      url = url.replace(/step=[^&]+/, 'step='+this.activeStep);
    } else if (hasParams) {
      url += '&step='+this.activeStep;
    } else {
      url += '?step='+this.activeStep;
    }
    this.location.replaceState(url);
    this.initDone=true;
  }

  ngOnInit() {

    this.formService.getJSON().subscribe(data => {
       this.bariatric = new Bariatric(data);
      /*
       this.formGroup = this.fb.group({
         formArray: new FormArray([])
       });
       */

       let arr = new FormArray([]);

       this.bariatric.funnel.forEach((step: any,i: number) => {
         let tempObj = {};
         let stepNumber = 'step' + (i+1);
         if(step.question) {
          let options = step.required ? ['', Validators.required ] : [''];
          tempObj[stepNumber] = options;
         } else if (step.questions) {
            let group = {};
            step.questions.forEach(input => {
              let options = (input.type === 'email' && input.required) ? ['', Validators.compose([Validators.required, Validators.email])] :
                input.required ? ['', Validators.required ] :
                  [''];
              group[input.field] = options;
            });
            if(step.tos) {
              group['tos_signoff'] = ['', Validators.required];
            }
            tempObj[stepNumber] = this.fb.group(group);;
         }
         arr.push( this.fb.group(tempObj) )
       });
       this.formGroup = this.fb.group({
         formArray: arr
       });
     }, error => {
       console.log(error);
     });

    /*
    this.formGroup = this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          step1: ['', Validators.required]
        }),
        this.fb.group({
          step2: ['', Validators.required]
        }),
        this.fb.group({
          step3: ['', Validators.required]
        }),
        this.fb.group({
          step4: ['', Validators.required]
        }),
        this.fb.group({
          step5: ['', Validators.required]
        }),
        this.fb.group({
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          email: ['', Validators.compose([Validators.required, Validators.email]) ],
          phone_number: ['', Validators.required],
          tos_signoff: ['', Validators.requiredTrue],
          additional_info: ['']
        })
      ])
    });
    */
    //this.onChanges();
    
  }

  updateUrl(activeStep):void {
    if(activeStep === this.activeStep) { return };
    this.location.replaceState(this.location.path().replace(/step=[^&]+/, 'step='+activeStep) );
    this.activeStep = activeStep;
  }

  getErrorMessages() {
    return this.formArray.get([5]).get('email').hasError('required') ? 'Please tells us your email' :
      this.formArray.get([5]).get('email').hasError('email') ? 'Please enter a valid email address' :
        '';
  }

  onSubmit(form:FormGroup):void {
    console.log('Submiting form, sire!');
    console.log(JSON.stringify(form.value,null,2));
    console.log('Is valid??? --> ' + form.valid );
  }

  onChanges():void {
    this.formGroup.valueChanges.subscribe(val => {
    });
  }
}
