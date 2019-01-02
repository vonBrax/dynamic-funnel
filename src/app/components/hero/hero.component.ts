import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormSyncService } from '../../services/form-sync.service';
import { bariatric } from '../../models/bariatric';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  formGroup = this.fb.group({});

  hasTopForm = false;
  bmi: any;
  heroStrings: any;
  // for bmi component, keep state between steps
  temp_controls = {
    ft: new FormControl('', [Validators.required]),
    in: new FormControl('', [Validators.required]),
    st: new FormControl('', [Validators.required]),
    lbs: new FormControl('', [Validators.required])
  };

  constructor(private formSyncService: FormSyncService, private fb: FormBuilder ) { }

  ngOnInit() {
    const hero = bariatric.find(i => i.hero_banner);
    const bmi = bariatric.find(i => i.name === 'anthropometry');
    if (hero) {
      this.heroStrings = hero.hero_banner;
    }
    if (bmi) {
      this.hasTopForm = true;
      this.bmi = bmi;
    }
  }

  addControl(step: any): void {
    this.formGroup.addControl(step.name, step.control);
  }


  goToFirstStep() {
    this.formSyncService.dataFlow.next('go to first step');
  }

  onBmiReady(val) {
    if (val) {
      this.formSyncService.dataFlow.next(val);
    }
    this.goToFirstStep();
  }
}
