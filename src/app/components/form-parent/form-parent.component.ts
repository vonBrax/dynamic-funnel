import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FunnelService } from '../../services/funnel.service';

@Component({
  selector: 'app-form-parent',
  templateUrl: './form-parent.component.html',
  styleUrls: ['./form-parent.component.css'],
  providers: [FunnelService]
})
export class FormParentComponent implements OnInit {

  funnelData: any;
  formParent: FormGroup;



  constructor(private formService: FunnelService, private fb: FormBuilder ) { }

  ngOnInit() {
    this.formService.getJSON().then( data => {
      this.funnelData = data;
      this.formParent = this.fb.group({});
    }).catch(err => console.log(err) );
  }
}
