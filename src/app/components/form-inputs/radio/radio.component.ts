import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Utils } from '../../../models/utils';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  @Input()
  parentGroup: FormGroup;

  @Input()
  data: any;

  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter();

  stepControl: FormControl;

  constructor( private utils: Utils) { }

  ngOnInit() {
    this.stepControl = this.utils.createSingleControl('', this.data.validators);
    this.addControlEvent.emit({name: this.data.name, control: this.stepControl});
  }
}
