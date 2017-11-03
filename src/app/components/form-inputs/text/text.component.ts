import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Utils } from '../../../models/utils';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  @Input()
  data: any;

  @Input()
  parentGroup: FormGroup;

  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.addControlEvent.emit({name: this.data.name, control:  Utils.createSingleControl('', this.data.validators ), parent: true });
  }

  selectErrorMessage(): string {
    return ( this.parentGroup.get(this.data.name).hasError('email') &&
              !this.parentGroup.get(this.data.name).hasError('required')) ?
                'Please enter a valid email address' :
                  this.data.error_message;
  }
}
