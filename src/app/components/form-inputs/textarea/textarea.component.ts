import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Utils } from '../../../models/utils';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {

  @Input()
  parentGroup: FormGroup;

  @Input()
  data: any;

  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
      this.addControlEvent.emit({
        name: this.data.name,
        control: Utils.createSingleControl(this.data.value, this.data.validators),
        parent: true
      });
  }
}
