import { Component, OnInit } from '@angular/core';
import { FormSyncService } from '../../services/form-sync.service';
import { bariatric } from '../../models/bariatric';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hasTopForm: boolean = false;
  topFormData: any;
  heroStrings: any;
  
  constructor(private formSyncService: FormSyncService ) { }

  ngOnInit() {
    bariatric.forEach(step => {
      if(step.hero_banner) {
        this.heroStrings = step.hero_banner;

        this.hasTopForm = step.hero_banner.funnel? true : false;
        this.topFormData = step.hero_banner.funnel;

      }
      /*  if( step.type === 'form_hero' ) {
        this.hasTopForm = true;
        this.topFormData = step;
      } */
    });
  }

  goToFirstStep() {
    this.formSyncService.dataFlow.next('go to first step');
  }

}
