import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { MatStepper } from '@angular/material';
import { Bariatric } from '../../models/bariatric';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [Location, {provide:LocationStrategy, useClass: PathLocationStrategy}, FormService ]
})
export class FormComponent implements OnInit, AfterViewInit {
  
  formGroup: FormGroup;
  private activeStep: number = 0;
  private lastStep: number;
  private initDone: boolean = false;
  bariatric: Bariatric;

  get formArray() { return this.formGroup.get('formArray') as FormArray; }

  constructor(private fb: FormBuilder,
              private location: Location,
              private formService: FormService ) { }

  @ViewChild('matStepper') matStepper: MatStepper

  ngAfterViewInit() {
    if(this.initDone) { return; }
    let url = this.location.path();
    let hasParams = /\?/.test( url );
    //this.activeStep = 0;
    let first = this.activeStep+1;
    
    if( hasParams && /step=/.test(url) ) {
      url = url.replace(/step=[^&]+/, 'step='+first);
    } else if (hasParams) {
      url += '&step='+first;
    } else {
      url += '?step='+first;
    }
    this.location.replaceState(url);
    this.initDone=true;
  }

  ngOnInit() {

    this.formService.getJSON().subscribe(data => {
       this.bariatric = new Bariatric(data);
       let arr = new FormArray([]);
       this.lastStep = this.bariatric.funnel.length - 1;
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
                input.required ? [input.default || '', Validators.required ] :
                  [''];
              group[input.field] = options;
            });
            if(step.tos) {
              group['tos_signoff'] = ['', Validators.requiredTrue];
            }
            tempObj[stepNumber] = this.fb.group(group);;
         }
         arr.push( this.fb.group(tempObj) )
       });
       this.formGroup = this.fb.group({
         formArray: arr
       });
        this.onChanges();
     }, error => {
       console.log(error);
     });
        
  }

  updateUrl(activeStep):void {
    if(activeStep === this.activeStep) { return };
    this.location.replaceState(this.location.path().replace(/step=[^&]+/, 'step='+(activeStep+1)) );
    this.activeStep = activeStep;
    
  }

  onSubmit(form:FormGroup):void {
    console.log('Submiting form, sire!');
    console.log(JSON.stringify(form.value,null,2));
    console.log('Is valid??? --> ' + form.valid );
  }

  onChanges():void {
    this.formGroup.valueChanges.subscribe(val => {
      if( this.matStepper.selectedIndex === 0 || this.matStepper.selectedIndex === this.lastStep) {
        return;
      }
      if ( this.formArray.controls[this.activeStep].valid) {
        setTimeout( () => {
          this.matStepper.next();
          this.updateUrl(this.matStepper.selectedIndex);
        }, 300)
        //this.matStepper.next();
        //let headerArr = this.matStepper._stepHeader.toArray();
        //let label = headerArr[this.activeStep].nativeElement.children[1];
        //console.log(label);
      }
      
    });
  }
}
