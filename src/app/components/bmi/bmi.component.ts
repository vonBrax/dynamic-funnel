import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css'],
  animations: [
    trigger('leftAnimation', [
        transition(':enter', [
            style({ transform: 'scaleX(0)', transformOrigin: 'left'}),
            animate('350ms 300ms ease-out', style({ transform: 'scaleX(1)'}))
        ]),
        transition(':leave', [
            animate('350ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0}))
        ])
    ]),
    trigger('rightAnimation', [
      transition(':enter', [
          style({ transform: 'scaleX(0)', transformOrigin: 'right' }),
          animate('350ms 300ms ease-out', style({ transform: 'scaleX(1)' }))
      ]),
      transition(':leave', [
          animate('350ms ease-out', style({ transform: 'translateX(100%)', opacity: 0}))
      ])
    ])
  ]
})
export class BmiComponent implements OnInit {

  @Input()  childGroup: FormGroup;
  @Input()  fields: any[];
  @Input()  button: string;
  @Input()  temp_controls: any;
  @Input()  skipValidation: boolean;

  @Output() bmiReady: EventEmitter<void> = new EventEmitter<void>();
  @Output() addControlEvent: EventEmitter<any> = new EventEmitter();

  thisGroup: FormGroup;
  LBS_TO_KG =  0.45359237;
  INCH_TO_CM = 2.54;

  dimensions = {
    height: {
      controls: [],
      visibility: 'metric',
      metric: 'cm',
      imperial: ['ft', 'in'],
      constant: this.INCH_TO_CM
    },
    weight: {
      controls: [],
      visibility: 'metric',
      metric: 'kg',
      imperial: ['st', 'lbs'],
      constant: this.LBS_TO_KG
    },
    bmi: {
      controls: []
    }
  };

  names = {
    ft: 'feet',
    in: 'inches',
    st: 'stones',
    lbs: 'pounds'
  };

  get height(): FormControl {
    return this.thisGroup.get('additional_info_height') as FormControl;
  }
  get weight(): FormControl {
    return this.thisGroup.get('additional_info_weight') as FormControl;
  }
  get unit_h(): FormControl {
    return this.thisGroup.get('additional_info_height_unit') as FormControl;
  }
  get unit_w(): FormControl {
    return this.thisGroup.get('additional_info_weight_unit') as FormControl;
  }
  get bmi(): FormControl {
    return this.thisGroup.get('additional_info_bmi') as FormControl;
  }

  constructor(private fb: FormBuilder ) { }

  ngOnInit() {
    const group = {};
    // this.fields.forEach(field => this.addControlEvent.emit({
    //   name: field.name,
    //   control: new FormControl(field.default || '', Validators[field.validators] )
    // }));
    this.fields.forEach(field => group[field.name] = new FormControl(field.default || '', Validators[field.validators]));
    this.thisGroup = new FormGroup(group);
    this.addControlEvent.emit({name: 'anthropometry', control: this.thisGroup});

    this.fields.forEach(field => {
      if (/height/.test(field.name)) {
        this.dimensions.height.controls.push(field);
        if ( (field.default && field.default !== this.dimensions.height.metric) || this.unit_h.value !== 'cm') {
          this.dimensions.height.visibility = 'imperial';
        }
      } else if (/weight/.test(field.name)) {
        this.dimensions.weight.controls.push(field);
        if ( (field.default && field.default !== this.dimensions.weight.metric) || this.unit_w.value !== 'kg') {
          this.dimensions.weight.visibility = 'imperial';
        }
      } else {
        this.dimensions.bmi.controls.push(field);
      }
    });
  }

  calculateBMI() {
    if (this.thisGroup.invalid) {
      if (this.skipValidation) {
        this.bmiReady.emit(this.thisGroup.value);
      } else {
        this.showErrors({...this.thisGroup.controls, ...this.temp_controls});
      }
      return;
    }
    // Convert cm to m
    const height = this.height.value * 0.01;
    const bmi = +(this.weight.value / (height * height)).toFixed(2);
    this.bmi.setValue(bmi);
    this.bmiReady.emit(this.thisGroup.value);
  }

  onChange(evt) {
    this[evt.dimension].setValue( (evt.value * this.dimensions[evt.dimension].constant).toFixed(2));
  }

  showErrors(controls) {
    Object.keys(controls).forEach(key => {
      if (!controls[key].validator) {
        return;
      }
      controls[key].markAsTouched();
    });
  }

  toggleVisibility(target, dim) {
    const unit = target.innerText.trim().toLowerCase();
    const system = unit === 'cm' || unit === 'kg'
    ? 'metric'
    : 'imperial';
    this.dimensions[dim].visibility = system;
  }
}
