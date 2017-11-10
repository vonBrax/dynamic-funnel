import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Utils } from '../../../models/utils';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input()
  parentGroup: FormGroup;
  @Input()
  data: any;
  @Input()
  isGroup: boolean;
  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  selectOpenedOrClosedEvent: EventEmitter<any> = new EventEmitter<any>();

  stepControl: FormControl;

  constructor() { }

  ngOnInit() {
    this.stepControl = Utils.createSingleControl('',this.data.validators);
    this.addControlEvent.emit({name: this.data.name, control: this.stepControl, parent: this.isGroup });
  }

  selectOpened() {
    this.selectOpenedOrClosedEvent.emit({opened: true, closed: false})
  }

  selectClosed() {
    this.selectOpenedOrClosedEvent.emit({opened: false, closed: true });
  }
}
